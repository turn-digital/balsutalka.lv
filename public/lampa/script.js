const SUPABASE_URL = 'https://cttlejjchlpnxftedjun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGxlampjaGxwbnhmdGVkanVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTk1MzYsImV4cCI6MjA3NDQzNTUzNn0.hryev2E6KcsiqeT6SRb4LPvIPea-KPR428PFK1FTs5c';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentClips = [];
let currentClipIndex = 0;
let validatedClipIds = new Set();
let isFirstClip = true;
let lastSavedValidation = null; // { id, clip, sentence, gender }
let editingUpdateOf = null;     // ID of the validation being corrected

// Guidelines read tracking
function hasReadGuidelines() {
    return localStorage.getItem('guidelines_read') === '1';
}

function markGuidelinesRead() {
    localStorage.setItem('guidelines_read', '1');
    // Re-render the current clip so action buttons appear
    displayCurrentClip();
}

// Validator name functions
function getValidatorName() {
    return localStorage.getItem('validator_name') || '';
}

function getValidatorEmail() {
    return localStorage.getItem('validator_email') || '';
}

async function saveValidatorName() {
    const nameInput = document.getElementById('validator-name-input');
    const emailInput = document.getElementById('validator-email-input');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) return;
    localStorage.setItem('validator_name', name);
    if (email) {
        localStorage.setItem('validator_email', email);
        try {
            await supabaseClient.from('validator_emails').insert({ validator_name: name, validator_email: email });
        } catch (e) {
            // silently ignore insert errors
        }
    }
    renderValidatorName();
}

function editValidatorName() {
    const display = document.getElementById('validator-name-display');
    const inputGroup = document.getElementById('validator-name-input-group');
    const nameInput = document.getElementById('validator-name-input');
    const emailInput = document.getElementById('validator-email-input');
    display.classList.add('d-none');
    inputGroup.classList.remove('d-none');
    nameInput.value = getValidatorName();
    emailInput.value = getValidatorEmail();
    nameInput.focus();
}

function renderValidatorName() {
    const name = getValidatorName();
    const display = document.getElementById('validator-name-display');
    const inputGroup = document.getElementById('validator-name-input-group');
    const nameText = document.getElementById('validator-name-text');
    const emailInput = document.getElementById('validator-email-input');
    if (name) {
        nameText.textContent = name;
        display.classList.remove('d-none');
        display.classList.add('d-flex');
        inputGroup.classList.add('d-none');
    } else {
        display.classList.add('d-none');
        display.classList.remove('d-flex');
        inputGroup.classList.remove('d-none');
        emailInput.classList.remove('d-none');
    }
}

function renderTodayCount() {
    const el = document.getElementById('today-count-display');
    if (!el) return;
    const count = getTodayValidationCount();
    if (count > 0) {
        el.textContent = `Šodien pārbaudīti ${count}`;
        el.classList.remove('d-none');
    } else {
        el.classList.add('d-none');
    }
}

// Daily validation counter functions
function getTodayDateString() {
    return new Date().toDateString();
}

function getTodayValidationCount() {
    const today = getTodayDateString();
    const stored = localStorage.getItem('daily_validation_count');

    if (!stored) return 0;

    try {
        const data = JSON.parse(stored);
        return data.date === today ? data.count : 0;
    } catch {
        return 0;
    }
}

function incrementTodayValidationCount() {
    const today = getTodayDateString();
    const currentCount = getTodayValidationCount();
    const newCount = currentCount + 1;

    localStorage.setItem('daily_validation_count', JSON.stringify({
        date: today,
        count: newCount
    }));

    return newCount;
}

async function loadClips() {
    try {
        const { data: clips, error } = await supabaseClient
            .from('clips_random')
            .select('*')
            .limit(5);

        if (error) {
            throw error;
        }

        currentClips = clips || [];
        currentClipIndex = 0;

        if (currentClips.length > 0) {
            displayCurrentClip();
            document.getElementById('loading').classList.add('d-none');
            document.getElementById('clips-container').classList.remove('d-none');
        } else {
            showError('Šobrīd nav ierakstu ko pārbaudīt.');
        }

    } catch (error) {
        showError('Kļūda ielādējot ierakstus: ' + error.message);
    }
}

function displayCurrentClip() {
    if (currentClipIndex >= currentClips.length) {
        loadNextBatch();
        return;
    }

    const container = document.getElementById('clips-container');
    container.innerHTML = '';

    const clip = currentClips[currentClipIndex];
    const audioUrl = `https://hospitalu23.duckdns.org/local/balsu-talka/mp3s/${clip.clip_name}.mp3`;
    const clipHtml = createClipHtml(clip, audioUrl);
    container.appendChild(clipHtml);

    // Auto-focus the textarea
    setTimeout(() => {
        const textArea = container.querySelector('.sentence-input');
        if (textArea) {
            textArea.focus();
        }
    }, 100);

    // Auto-play for all clips except the first one
    if (!isFirstClip) {
        setTimeout(() => {
            const audioElement = container.querySelector('audio');
            if (audioElement) {
                audioElement.play().catch(err => console.log('Autoplay failed:', err));
            }
        }, 500);
    } else {
        isFirstClip = false;
    }
}

async function loadNextBatch() {
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('clips-container').classList.add('d-none');
    await loadClips();
}

function createClipHtml(clip, audioUrl) {
    const clipDiv = document.createElement('div');
    clipDiv.className = 'clip-item card mb-4';
    clipDiv.setAttribute('data-clip-id', clip.id);

    clipDiv.innerHTML = `
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Audio:</label>
                ${audioUrl ?
                    `<audio controls class="form-control">
                        <source src="${audioUrl}" type="audio/mp3">
                        Your browser does not support the audio element.
                    </audio>` :
                    '<p class="text-warning">Audio nav pieejams</p>'
                }
            </div>

            <div class="mb-3">
                <label for="sentence-${clip.id}" class="form-label">Teikums:</label>
                <textarea
                    id="sentence-${clip.id}"
                    class="form-control sentence-input"
                    rows="3"
                    lang="lv"
                    spellcheck="true"
                >${clip.sentence}</textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Dzimums:</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input gender-radio" type="radio" name="gender-${clip.id}" id="gender-male-${clip.id}" value="male">
                    <label class="form-check-label" for="gender-male-${clip.id}">Vīrietis</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input gender-radio" type="radio" name="gender-${clip.id}" id="gender-female-${clip.id}" value="female">
                    <label class="form-check-label" for="gender-female-${clip.id}">Sieviete</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="clip-invalid-${clip.id}">
                    <label class="form-check-label" for="clip-invalid-${clip.id}">Ieraksts nav derīgs (piemēram nav latviski)</label>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                    ${hasReadGuidelines() ? `
                    <button
                        type="button"
                        class="btn btn-primary save-btn"
                        onclick="saveValidation(${clip.id})"
                    >
                        Saglabāt
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary skip-btn"
                        onclick="skipClip(${clip.id})"
                    >
                        Izlaist
                    </button>
                    ${lastSavedValidation && !editingUpdateOf ? `<button
                        type="button"
                        class="btn btn-secondary"
                        onclick="loadPreviousValidation()"
                        title="Ielādēt iepriekšējo validāciju labošanai"
                    >
                        <i class="bi bi-arrow-counterclockwise"></i> Labot iepriekšējo
                    </button>` : ''}
                    ` : `
                    <span class="text-muted small">Lūdzu iepazīstieties ar pārbaudīšanas vadlīnijām, kas pieejamas zemāk</span>
                    <button
                        type="button"
                        class="btn btn-outline-primary btn-sm"
                        onclick="markGuidelinesRead()"
                    >
                        Izlasīju
                    </button>
                    `}
                </div>
                <div class="d-flex align-items-center gap-3">
                    <small class="text-muted validation-status" id="status-${clip.id}">
                    </small>
                    <a href="https://commonvoice.mozilla.org/lv/guidelines?tab=spontaneous-speech#transcribe-the-audio-subheader-1"
                       target="_blank"
                       class="guidelines-link text-decoration-none"
                       title="Vadlīnijas">
                        <i class="bi bi-info-circle"></i> Vadlīnijas
                    </a>
                    <button type="button" class="btn btn-link p-0 text-decoration-none text-secondary" onclick="toggleStats()" title="Statistika">
                        <i class="bi bi-bar-chart"></i> Statistika
                    </button>
                </div>
            </div>
            <div class="text-danger mt-2 d-none" id="sentence-error-${clip.id}"></div>
        </div>
    `;

    return clipDiv;
}

async function saveValidation(clipId) {
    const textArea = document.getElementById(`sentence-${clipId}`);
    const saveBtn = textArea.closest('.card-body').querySelector('.save-btn');
    const statusElement = document.getElementById(`status-${clipId}`);

    const errorDiv = document.getElementById(`sentence-error-${clipId}`);

    if (!textArea.value.trim()) {
        showError('Lūdzu ievadiet teikumu pirms saglabāšanas.');
        return;
    }

    if (/[\d%]/.test(textArea.value)) {
        errorDiv.textContent = 'Lūdzu pārrakstiet skaitļus vārdiem';
        errorDiv.classList.remove('d-none');
        return;
    }

    errorDiv.classList.add('d-none');

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saglabā...';

    try {
        const genderRadio = document.querySelector(`input[name="gender-${clipId}"]:checked`);
        const clipInvalidCheckbox = document.getElementById(`clip-invalid-${clipId}`);
        const insertData = {
            clip_id: clipId,
            sentence: textArea.value.trim()
        };
        if (genderRadio) {
            insertData.gender = genderRadio.value;
        }
        if (clipInvalidCheckbox?.checked) {
            insertData.clip_is_invalid = true;
        }
        const validatorName = getValidatorName();
        if (validatorName) {
            insertData.validator_name = validatorName;
        }

        if (editingUpdateOf) {
            insertData.update_of = editingUpdateOf;
        }

        const { data: insertedRows, error } = await supabaseClient
            .from('validations')
            .insert([insertData])
            .select('id');

        if (error) {
            throw error;
        }

        const insertedId = insertedRows?.[0]?.id ?? null;
        const genderRadioForState = document.querySelector(`input[name="gender-${clipId}"]:checked`);
        lastSavedValidation = {
            id: insertedId,
            clip: currentClips[currentClipIndex] ?? lastSavedValidation?.clip,
            sentence: insertData.sentence,
            gender: genderRadioForState?.value ?? null
        };
        const wasEditingPrevious = editingUpdateOf !== null;
        editingUpdateOf = null;

        statusElement.textContent = 'Pārbaude saglabāta!';
        statusElement.className = 'text-success align-self-center validation-status';
        saveBtn.textContent = 'Saglabāts ✓';
        saveBtn.classList.remove('btn-primary');
        saveBtn.classList.add('btn-success');

        validatedClipIds.add(clipId);

        // Increment daily validation counter
        incrementTodayValidationCount();
        renderTodayCount();

        setTimeout(() => {
            if (!wasEditingPrevious) currentClipIndex++;
            displayCurrentClip();
        }, 1500);

    } catch (error) {
        showError('Error saving validation: ' + error.message);
        saveBtn.disabled = false;
        saveBtn.textContent = 'Saglabāt';
        statusElement.textContent = 'Kļūda saglabājot';
        statusElement.className = 'text-danger align-self-center validation-status';
    }
}

function skipClip(clipId) {
    const statusElement = document.getElementById(`status-${clipId}`);

    statusElement.textContent = 'Izlaists';
    statusElement.className = 'text-info align-self-center validation-status';

    setTimeout(() => {
        currentClipIndex++;
        displayCurrentClip();
    }, 500);
}

function loadPreviousValidation() {
    if (!lastSavedValidation) return;

    const { id, clip, sentence, gender } = lastSavedValidation;
    editingUpdateOf = id;

    const container = document.getElementById('clips-container');
    container.innerHTML = '';

    const audioUrl = `https://hospitalu23.duckdns.org/local/balsu-talka/mp3s/${clip.clip_name}.mp3`;
    const clipHtml = createClipHtml(clip, audioUrl);
    container.appendChild(clipHtml);

    // Prefill with saved values
    const textArea = document.getElementById(`sentence-${clip.id}`);
    if (textArea) textArea.value = sentence;

    if (gender) {
        const radio = document.getElementById(`gender-${gender === 'male' ? 'male' : 'female'}-${clip.id}`);
        if (radio) radio.checked = true;
    }

    // Mark card visually as edit mode — insert notice just before the action buttons
    const card = container.querySelector('.clip-item');
    if (card) {
        const badge = document.createElement('div');
        badge.className = 'alert alert-warning py-1 px-2 mb-2 mt-2 small';
        badge.innerHTML = '<i class="bi bi-pencil-square"></i> Rediģējat iepriekšējo validāciju';
        const errorDiv = card.querySelector('[id^="sentence-error-"]');
        errorDiv.insertAdjacentElement('afterend', badge);
    }

    setTimeout(() => { if (textArea) textArea.focus(); }, 100);
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove('d-none');

    document.getElementById('loading').classList.add('d-none');

    setTimeout(() => {
        errorDiv.classList.add('d-none');
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('contextmenu', (event) => {
    if (event.ctrlKey) event.preventDefault();
});

document.addEventListener('keydown', (event) => {
    const mod = event.ctrlKey || event.metaKey;

    // Ctrl/Cmd+Shift+Space to play current clip from start
    if (mod && event.shiftKey && event.code === 'Space') {
        event.preventDefault();
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();
        }
        return;
    }

    // Ctrl/Cmd+Shift+Left to rewind audio by 2 seconds
    if (mod && event.shiftKey && event.code === 'ArrowLeft') {
        event.preventDefault();
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.currentTime = Math.max(0, audioElement.currentTime - 2);
        }
        return;
    }

    // Ctrl/Cmd+Shift+V to select Vīrietis
    if (mod && event.shiftKey && event.code === 'KeyV') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            const radio = document.getElementById(`gender-male-${currentClip.id}`);
            if (radio) radio.checked = true;
        }
        return;
    }

    // Ctrl/Cmd+Shift+S to select Sieviete
    if (mod && event.shiftKey && event.code === 'KeyS') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            const radio = document.getElementById(`gender-female-${currentClip.id}`);
            if (radio) radio.checked = true;
        }
        return;
    }

    // Ctrl/Cmd+Shift+1/2/3/4 to insert markings at cursor position
    const markings = { 'Digit1': '[laugh]', 'Digit2': '[disfluency]', 'Digit3': '[unclear]', 'Digit4': '[noise]' };
    if (mod && event.shiftKey && markings[event.code]) {
        const textArea = document.querySelector('.sentence-input');
        if (textArea) {
            event.preventDefault();
            const marking = markings[event.code];
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            const value = textArea.value;
            const insert = (start > 0 && value[start - 1] !== ' ' ? ' ' : '') + marking + (end < value.length && value[end] !== ' ' ? ' ' : '');
            textArea.value = value.slice(0, start) + insert + value.slice(end);
            const cursor = start + insert.length;
            textArea.selectionStart = textArea.selectionEnd = cursor;
            textArea.focus();
        }
        return;
    }

    // Ctrl/Cmd+Shift+Enter to save validation
    if (mod && event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            saveValidation(currentClip.id);
        }
        return;
    }
});

let statsLoaded = false;

function toggleStats() {
    const section = document.getElementById('stats-section');
    const isHidden = section.classList.contains('d-none');
    if (isHidden) {
        if (!statsLoaded) {
            statsLoaded = true;
            loadStats().then(() => section.scrollIntoView({ behavior: 'smooth' }));
        } else {
            section.classList.remove('d-none');
            section.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        section.classList.add('d-none');
    }
}

async function loadStats() {
    const section = document.getElementById('stats-section');
    section.classList.remove('d-none');

    const { data, error } = await supabaseClient
        .from('validation_stats')
        .select('validator_name, validated_count, validated_seconds')
        .order('validated_count', { ascending: false });

    document.getElementById('stats-loading').classList.add('d-none');

    if (error || !data) return;

    const tbody = document.getElementById('stats-tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        const secs = Math.round(row.validated_seconds || 0);
        const mins = Math.floor(secs / 60);
        const secsPart = secs % 60;
        const duration = mins > 0 ? `${mins}m ${secsPart}s` : `${secs}s`;
        tr.innerHTML = `<td>${row.validator_name}</td><td class="text-end">${row.validated_count}</td><td class="text-end">${duration}</td>`;
        tbody.appendChild(tr);
    });

    document.getElementById('stats-table').classList.remove('d-none');

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    document.getElementById('stats-updated').textContent = `Atjaunināts ${dd}.${mm}.${yyyy} 00:00`;
}

// Admin check mode: ?check=ValidatorName
async function loadCheckMode(validatorName) {
    document.getElementById('loading').classList.add('d-none');

    const { data, error } = await supabaseClient
        .from('validations')
        .select('id, sentence, gender, created_at, clip_id, clips(id, clip_name, sentence)')
        .eq('validator_name', validatorName)
        .order('id', { ascending: false })
        .limit(10);

    const container = document.getElementById('check-mode-container');
    container.classList.remove('d-none');

    if (error || !data || data.length === 0) {
        container.innerHTML = `<div class="alert alert-warning">Nav atrasta neviena validācija lietotājam "<strong>${validatorName}</strong>".</div>`;
        return;
    }

    const listItems = data.map(v => {
        const clip = v.clips;
        const date = new Date(v.created_at).toLocaleString('lv-LV');
        const genderLabel = v.gender === 'male' ? 'V' : v.gender === 'female' ? 'S' : '?';
        return `<li class="list-group-item list-group-item-action check-validation-item" role="button"
                    data-validation-id="${v.id}"
                    data-clip-id="${clip?.id ?? ''}"
                    data-clip-name="${clip?.clip_name ?? ''}"
                    data-original-sentence="${clip?.sentence ?? ''}"
                    data-sentence="${v.sentence}"
                    data-gender="${v.gender ?? ''}">
            <div class="d-flex justify-content-between align-items-start">
                <span class="text-truncate me-2" style="max-width:70%">${v.sentence}</span>
                <small class="text-muted text-nowrap">${genderLabel} &middot; ${date}</small>
            </div>
        </li>`;
    }).join('');

    container.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title mb-3"><i class="bi bi-person-check"></i> Validācijas: <strong>${validatorName}</strong></h5>
                <p class="text-muted small mb-2">Klikšķiniet uz ieraksta, lai skatītu audio un validāciju.</p>
                <ul class="list-group list-group-flush" id="check-validation-list">${listItems}</ul>
            </div>
        </div>
        <div id="check-clip-viewer" class="d-none"></div>
    `;

    container.querySelectorAll('.check-validation-item').forEach(item => {
        item.addEventListener('click', () => {
            container.querySelectorAll('.check-validation-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            showCheckClip(
                item.dataset.clipId,
                item.dataset.clipName,
                item.dataset.originalSentence,
                item.dataset.sentence,
                item.dataset.gender
            );
        });
    });
}

function showCheckClip(clipId, clipName, originalSentence, validatedSentence, gender) {
    const viewer = document.getElementById('check-clip-viewer');
    viewer.classList.remove('d-none');
    const audioUrl = `https://hospitalu23.duckdns.org/local/balsu-talka/mp3s/${clipName}.mp3`;
    const genderLabel = gender === 'male' ? 'Vīrietis' : gender === 'female' ? 'Sieviete' : '—';

    const changed = originalSentence !== validatedSentence;
    const diffHtml = changed
        ? `<div class="mt-2"><small class="text-muted">Oriģinālais teikums:</small><div class="p-2 bg-light border rounded small mt-1">${originalSentence}</div></div>`
        : '';

    viewer.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Audio:</label>
                    <audio controls class="form-control">
                        <source src="${audioUrl}" type="audio/mp3">
                    </audio>
                </div>
                <div class="mb-3">
                    <label class="form-label">Validētais teikums:</label>
                    <div class="p-2 border rounded bg-light">${validatedSentence}</div>
                    ${diffHtml}
                </div>
                <div>
                    <label class="form-label">Dzimums:</label>
                    <span class="ms-2">${genderLabel}</span>
                </div>
            </div>
        </div>
    `;
    viewer.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const checkName = params.get('check');

    if (checkName) {
        // Admin check mode — skip normal clip loading
        document.getElementById('validator-name-section').classList.add('d-none');
        loadCheckMode(checkName);
    } else {
        renderValidatorName();
        renderTodayCount();
        document.getElementById('validator-name-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveValidatorName();
        });
        document.getElementById('validator-email-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveValidatorName();
        });
        loadClips();
        if (params.has('stats')) {
            statsLoaded = true;
            loadStats();
        }
    }
});