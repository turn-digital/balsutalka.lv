const SUPABASE_URL = 'https://cttlejjchlpnxftedjun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGxlampjaGxwbnhmdGVkanVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTk1MzYsImV4cCI6MjA3NDQzNTUzNn0.hryev2E6KcsiqeT6SRb4LPvIPea-KPR428PFK1FTs5c';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentClips = [];
let currentClipIndex = 0;
let validatedClipIds = new Set();
let isFirstClip = true;
let lastSavedValidation = null; // { id, clip, sentence, gender }
let editingUpdateOf = null;     // ID of the validation being corrected

// Validator name functions
function getValidatorName() {
    return localStorage.getItem('validator_name') || '';
}

function saveValidatorName() {
    const input = document.getElementById('validator-name-input');
    const name = input.value.trim();
    if (!name) return;
    localStorage.setItem('validator_name', name);
    renderValidatorName();
}

function editValidatorName() {
    const display = document.getElementById('validator-name-display');
    const inputGroup = document.getElementById('validator-name-input-group');
    const input = document.getElementById('validator-name-input');
    display.classList.add('d-none');
    inputGroup.classList.remove('d-none');
    input.focus();
}

function renderValidatorName() {
    const name = getValidatorName();
    const display = document.getElementById('validator-name-display');
    const inputGroup = document.getElementById('validator-name-input-group');
    const nameText = document.getElementById('validator-name-text');
    if (name) {
        nameText.textContent = name;
        display.classList.remove('d-none');
        display.classList.add('d-flex');
        inputGroup.classList.add('d-none');
    } else {
        display.classList.add('d-none');
        display.classList.remove('d-flex');
        inputGroup.classList.remove('d-none');
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

    const todayCount = getTodayValidationCount();

    clipDiv.innerHTML = `
        <div class="card-body">
            <div class="card-title">Ieraksts: ${clip.clip_name}</div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                ${todayCount > 0 ?
                    `<p class="text-muted mb-0">Šodien pārbaudīti ${todayCount}</p>` :
                    `<p class="text-muted mb-0"></p>`
                }
            </div>

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
            </div>

            <div class="d-flex justify-content-between">
                <div class="d-flex gap-2">
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
        const insertData = {
            clip_id: clipId,
            sentence: textArea.value.trim()
        };
        if (genderRadio) {
            insertData.gender = genderRadio.value;
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
document.addEventListener('keydown', (event) => {
    // Ctrl+Space to play current clip from start
    if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();
        }
        return;
    }

    // Ctrl+Left to rewind audio by 2 seconds
    if (event.ctrlKey && event.code === 'ArrowLeft') {
        event.preventDefault();
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.currentTime = Math.max(0, audioElement.currentTime - 2);
        }
        return;
    }

    // Ctrl+V to select Vīrietis
    if (event.ctrlKey && event.key === 'v') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            const radio = document.getElementById(`gender-male-${currentClip.id}`);
            if (radio) radio.checked = true;
        }
        return;
    }

    // Ctrl+S to select Sieviete
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            const radio = document.getElementById(`gender-female-${currentClip.id}`);
            if (radio) radio.checked = true;
        }
        return;
    }

    // Ctrl+Enter to save validation
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        const currentClip = currentClips[currentClipIndex];
        if (currentClip) {
            saveValidation(currentClip.id);
        }
        return;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderValidatorName();
    document.getElementById('validator-name-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveValidatorName();
    });
    loadClips();
});