/* =========================================================================
   LU-107 audio recorder
   Records a short clip in the browser and stores it in Supabase.

   URL parameters:
     ?instructions=1|0   show or hide the instruction block (default: 1)
     ?prompt=2           force a specific instruction (1-based index of PROMPTS)
     ?max=45             maximum recording length in seconds (default: 60)
     ?source=lu107       free-form tag stored with the recording (default: lu107)
   ========================================================================= */

/* ---------- Instructions the user can be asked to record ---------- */
/* Add / edit freely — one of these is picked at random when instructions
   are shown. Keep them short enough to read at a glance. */
const PROMPTS = [
    'Izstāsti īsu sveicienu Latvijas Universitātei',
    'Izstāsti īsu atmiņu par kādu īpašu notikumu Latvijas Universitātē',
    'Pastāsti, ar ko Latvijas Universitāte Tev saistās vispirms',
    'Novēli kaut ko Latvijas Universitātes studentiem nākamajos simts gados',
    'Pastāsti par pasniedzēju vai kursabiedru, kuru atceries vislabāk',
    'Kāds ir Tavs mīļākais stūrītis Latvijas Universitātē? Pastāsti par to!'
];

/* ---------- Supabase ---------- */
const SUPABASE_URL = 'https://cttlejjchlpnxftedjun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGxlampjaGxwbnhmdGVkanVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTk1MzYsImV4cCI6MjA3NDQzNTUzNn0.hryev2E6KcsiqeT6SRb4LPvIPea-KPR428PFK1FTs5c';
const STORAGE_BUCKET = 'lu107-recordings';
const TABLE_NAME = 'lu107_recordings';

/* ---------- Recording limits ---------- */
const DEFAULT_MAX_SECONDS = 60;
const MIN_SECONDS = 1;
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- State ---------- */
const params = new URLSearchParams(window.location.search);
const showInstructions = parseBool(params.get('instructions'), true);
const maxSeconds = clamp(parseInt(params.get('max'), 10) || DEFAULT_MAX_SECONDS, 5, 600);
const sourceTag = (params.get('source') || 'lu107').slice(0, 60);

let mediaStream = null;
let mediaRecorder = null;
let chunks = [];
let recordedBlob = null;
let recordedMimeType = '';
let recordedSeconds = 0;
let activePrompt = null;
let startedAt = 0;
let tickTimer = null;
let audioContext = null;
let analyser = null;
let meterFrame = null;
let isRecording = false;

/* ---------- Elements ---------- */
const el = {
    shell: document.getElementById('recorder-shell'),
    instructionCard: document.getElementById('instruction-card'),
    promptText: document.getElementById('prompt-text'),
    promptShuffle: document.getElementById('prompt-shuffle'),
    layout: document.getElementById('layout'),
    card: document.getElementById('recorder-card'),
    micArea: document.querySelector('.mic-area'),
    micButton: document.getElementById('mic-button'),
    micHint: document.getElementById('mic-hint'),
    timer: document.getElementById('timer'),
    timerMax: document.getElementById('timer-max'),
    meter: document.getElementById('level-meter'),
    review: document.getElementById('review'),
    reviewAudio: document.getElementById('review-audio'),
    retryButton: document.getElementById('retry-button'),
    submitButton: document.getElementById('submit-button'),
    status: document.getElementById('status'),
    done: document.getElementById('done'),
    againButton: document.getElementById('again-button')
};

/* ---------- Helpers ---------- */

function parseBool(value, fallback) {
    if (value === null || value === '') return fallback;
    return ['1', 'true', 'yes', 'y', 'on'].includes(value.toLowerCase());
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function formatTime(seconds) {
    const total = Math.floor(seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function setStatus(message, kind) {
    el.status.textContent = message || '';
    el.status.className = 'status' + (kind ? ` is-${kind}` : '');
}

function pickPrompt() {
    const forced = parseInt(params.get('prompt'), 10);
    if (forced >= 1 && forced <= PROMPTS.length) return PROMPTS[forced - 1];
    return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

function showPrompt(next) {
    let candidate = pickPrompt();
    if (next && PROMPTS.length > 1) {
        while (candidate === activePrompt) candidate = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    }
    activePrompt = candidate;
    el.promptText.textContent = activePrompt;
}

/* Tell the embedding page how tall we are, so the iframe can resize. */
function reportHeight() {
    if (window.parent === window) return;
    const height = Math.ceil(document.documentElement.getBoundingClientRect().height);
    window.parent.postMessage({ type: 'lu107-recorder-height', height }, '*');
}

/* Pick a container the browser can actually record into.
   Safari (iOS + macOS) only offers mp4/aac; everything else does webm/opus. */
function pickMimeType() {
    const candidates = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4;codecs=mp4a.40.2',
        'audio/mp4'
    ];
    if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return '';
    return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || '';
}

function extensionFor(mimeType) {
    if (mimeType.includes('webm')) return 'webm';
    if (mimeType.includes('ogg')) return 'ogg';
    if (mimeType.includes('mp4') || mimeType.includes('m4a') || mimeType.includes('aac')) return 'm4a';
    if (mimeType.includes('wav')) return 'wav';
    return 'bin';
}

function randomId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ---------- Level meter ---------- */

function startMeter(stream) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    source.connect(analyser);
    drawMeter();
}

function drawMeter() {
    const canvas = el.meter;
    const ctx = canvas.getContext('2d');
    const buffer = new Uint8Array(analyser.fftSize);
    const bars = 48;

    const render = () => {
        meterFrame = requestAnimationFrame(render);
        analyser.getByteTimeDomainData(buffer);

        let sumSquares = 0;
        for (let i = 0; i < buffer.length; i++) {
            const deviation = (buffer[i] - 128) / 128;
            sumSquares += deviation * deviation;
        }
        const level = Math.min(1, Math.sqrt(sumSquares / buffer.length) * 3.2);

        const width = canvas.width;
        const height = canvas.height;
        const barWidth = width / bars;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < bars; i++) {
            // Bars fade out towards the edges so the meter reads as a waveform.
            const falloff = 1 - Math.abs(i - (bars - 1) / 2) / ((bars - 1) / 2);
            const jitter = 0.55 + Math.random() * 0.45;
            const barHeight = Math.max(3, level * height * (0.35 + falloff * 0.65) * jitter);
            ctx.fillStyle = level > 0.06 ? '#002d74' : '#d5dae4';
            ctx.fillRect(i * barWidth + barWidth * 0.2, (height - barHeight) / 2, barWidth * 0.6, barHeight);
        }
    };
    render();
}

function stopMeter() {
    if (meterFrame) cancelAnimationFrame(meterFrame);
    meterFrame = null;
    analyser = null;
    if (audioContext) {
        audioContext.close().catch(() => {});
        audioContext = null;
    }
    const ctx = el.meter.getContext('2d');
    ctx.clearRect(0, 0, el.meter.width, el.meter.height);
}

/* ---------- Recording ---------- */

async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
        setStatus('Šī pārlūkprogramma neatbalsta ierakstīšanu. Pamēģini ar Chrome, Safari vai Firefox jaunāko versiju.', 'error');
        return;
    }

    setStatus('');
    el.micButton.disabled = true;

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });
    } catch (error) {
        el.micButton.disabled = false;
        const denied = error && (error.name === 'NotAllowedError' || error.name === 'SecurityError');
        setStatus(denied
            ? 'Piekļuve mikrofonam netika atļauta. Atļauj to pārlūka iestatījumos un mēģini vēlreiz.'
            : 'Neizdevās piekļūt mikrofonam: ' + (error && error.message ? error.message : 'nezināma kļūda'), 'error');
        return;
    }

    recordedMimeType = pickMimeType();
    try {
        mediaRecorder = recordedMimeType
            ? new MediaRecorder(mediaStream, { mimeType: recordedMimeType })
            : new MediaRecorder(mediaStream);
    } catch (error) {
        releaseStream();
        el.micButton.disabled = false;
        setStatus('Neizdevās sākt ierakstu: ' + error.message, 'error');
        return;
    }

    chunks = [];
    mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data && event.data.size > 0) chunks.push(event.data);
    });
    mediaRecorder.addEventListener('stop', handleRecordingStopped);

    mediaRecorder.start();
    isRecording = true;
    startedAt = Date.now();

    el.micButton.disabled = false;
    el.micButton.classList.add('is-recording');
    el.micButton.setAttribute('aria-label', 'Apturēt ierakstu');
    el.card.classList.add('recording');
    el.micHint.textContent = 'Runā tagad — nospied vēlreiz, kad esi pabeidzis';
    el.review.hidden = true;
    el.done.hidden = true;

    startMeter(mediaStream);
    tick();
    tickTimer = setInterval(tick, 200);
    reportHeight();
}

function tick() {
    const elapsed = (Date.now() - startedAt) / 1000;
    el.timer.textContent = formatTime(elapsed);
    if (elapsed >= maxSeconds) {
        stopRecording();
        setStatus(`Sasniegts maksimālais ieraksta garums (${formatTime(maxSeconds)}).`);
    }
}

function stopRecording() {
    if (!isRecording || !mediaRecorder) return;
    isRecording = false;
    recordedSeconds = (Date.now() - startedAt) / 1000;
    clearInterval(tickTimer);
    tickTimer = null;
    stopMeter();
    try {
        mediaRecorder.stop();
    } catch (error) {
        setStatus('Neizdevās pabeigt ierakstu: ' + error.message, 'error');
    }
    el.micButton.classList.remove('is-recording');
    el.micButton.setAttribute('aria-label', 'Sākt ierakstu');
    el.card.classList.remove('recording');
}

function handleRecordingStopped() {
    releaseStream();

    const type = recordedMimeType || (chunks[0] && chunks[0].type) || 'audio/webm';
    recordedBlob = new Blob(chunks, { type });
    chunks = [];

    if (recordedSeconds < MIN_SECONDS || recordedBlob.size < 1024) {
        recordedBlob = null;
        el.micHint.textContent = 'Nospied, lai sāktu ierakstu';
        el.timer.textContent = '0:00';
        setStatus('Ieraksts bija par īsu. Pamēģini vēlreiz un parunā vismaz pāris sekundes.', 'error');
        reportHeight();
        return;
    }

    el.reviewAudio.src = URL.createObjectURL(recordedBlob);
    el.micArea.hidden = true;
    el.review.hidden = false;
    setStatus('');
    reportHeight();
}

function releaseStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        mediaStream = null;
    }
    mediaRecorder = null;
}

/* ---------- Upload ---------- */

async function submitRecording() {
    if (!recordedBlob) return;

    if (recordedBlob.size > MAX_UPLOAD_BYTES) {
        setStatus('Ieraksts ir pārāk liels. Ieraksti īsāku fragmentu.', 'error');
        return;
    }

    el.submitButton.disabled = true;
    el.retryButton.disabled = true;
    setStatus('Augšupielādē ierakstu…');

    const extension = extensionFor(recordedBlob.type || recordedMimeType);
    const id = randomId();
    const now = new Date();
    const datePath = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const storagePath = `${datePath}/${id}.${extension}`;

    try {
        const { error: uploadError } = await supabaseClient.storage
            .from(STORAGE_BUCKET)
            .upload(storagePath, recordedBlob, {
                contentType: recordedBlob.type || recordedMimeType || 'audio/webm',
                upsert: false
            });

        if (uploadError) throw uploadError;

        const { error: insertError } = await supabaseClient
            .from(TABLE_NAME)
            .insert({
                storage_path: storagePath,
                mime_type: recordedBlob.type || recordedMimeType || null,
                duration_seconds: Math.round(recordedSeconds * 100) / 100,
                size_bytes: recordedBlob.size,
                prompt_text: showInstructions ? activePrompt : null,
                source: sourceTag,
                user_agent: navigator.userAgent.slice(0, 500)
            });

        // The audio itself is already safe in storage — a failed metadata row
        // should not look like a failed recording to the user.
        if (insertError) console.error('Metadata insert failed:', insertError);

        showDone();
    } catch (error) {
        el.submitButton.disabled = false;
        el.retryButton.disabled = false;
        setStatus('Neizdevās nosūtīt ierakstu: ' + (error.message || 'nezināma kļūda') + '. Pamēģini vēlreiz.', 'error');
        reportHeight();
    }
}

function showDone() {
    if (el.reviewAudio.src) URL.revokeObjectURL(el.reviewAudio.src);
    el.reviewAudio.removeAttribute('src');
    recordedBlob = null;
    el.review.hidden = true;
    el.micArea.hidden = true;
    el.done.hidden = false;
    setStatus('');
    reportHeight();
}

function resetRecorder(newPrompt) {
    if (el.reviewAudio.src) URL.revokeObjectURL(el.reviewAudio.src);
    el.reviewAudio.removeAttribute('src');
    recordedBlob = null;
    recordedSeconds = 0;
    el.review.hidden = true;
    el.done.hidden = true;
    el.micArea.hidden = false;
    el.micButton.disabled = false;
    el.submitButton.disabled = false;
    el.retryButton.disabled = false;
    el.timer.textContent = '0:00';
    el.micHint.textContent = 'Nospied, lai sāktu ierakstu';
    setStatus('');
    if (newPrompt && showInstructions) showPrompt(true);
    reportHeight();
}

/* ---------- Wiring ---------- */

el.timerMax.textContent = `/ ${formatTime(maxSeconds)}`;

if (showInstructions) {
    el.instructionCard.hidden = false;
    showPrompt(false);
    el.promptShuffle.addEventListener('click', () => showPrompt(true));
} else {
    el.instructionCard.hidden = true;
    el.layout.classList.add('single-column');
}

el.micButton.addEventListener('click', () => {
    if (isRecording) stopRecording();
    else startRecording();
});

el.retryButton.addEventListener('click', () => resetRecorder(false));
el.submitButton.addEventListener('click', submitRecording);
el.againButton.addEventListener('click', () => resetRecorder(true));

window.addEventListener('resize', reportHeight);
window.addEventListener('load', reportHeight);
reportHeight();
