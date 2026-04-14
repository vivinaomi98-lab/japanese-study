// ============================================================
// DATA
// ============================================================

const ALL_CHARS = [
  // Vowels
  { hiragana: 'あ', romaji: 'a',   alt: [],     family: 'a', row: '' },
  { hiragana: 'い', romaji: 'i',   alt: [],     family: 'i', row: '' },
  { hiragana: 'う', romaji: 'u',   alt: [],     family: 'u', row: '' },
  { hiragana: 'え', romaji: 'e',   alt: [],     family: 'e', row: '' },
  { hiragana: 'お', romaji: 'o',   alt: [],     family: 'o', row: '' },
  // K
  { hiragana: 'か', romaji: 'ka',  alt: [],     family: 'a', row: 'k' },
  { hiragana: 'き', romaji: 'ki',  alt: [],     family: 'i', row: 'k' },
  { hiragana: 'く', romaji: 'ku',  alt: [],     family: 'u', row: 'k' },
  { hiragana: 'け', romaji: 'ke',  alt: [],     family: 'e', row: 'k' },
  { hiragana: 'こ', romaji: 'ko',  alt: [],     family: 'o', row: 'k' },
  // S
  { hiragana: 'さ', romaji: 'sa',  alt: [],     family: 'a', row: 's' },
  { hiragana: 'し', romaji: 'shi', alt: ['si'], family: 'i', row: 's' },
  { hiragana: 'す', romaji: 'su',  alt: [],     family: 'u', row: 's' },
  { hiragana: 'せ', romaji: 'se',  alt: [],     family: 'e', row: 's' },
  { hiragana: 'そ', romaji: 'so',  alt: [],     family: 'o', row: 's' },
  // T
  { hiragana: 'た', romaji: 'ta',  alt: [],     family: 'a', row: 't' },
  { hiragana: 'ち', romaji: 'chi', alt: ['ti'], family: 'i', row: 't' },
  { hiragana: 'つ', romaji: 'tsu', alt: ['tu'], family: 'u', row: 't' },
  { hiragana: 'て', romaji: 'te',  alt: [],     family: 'e', row: 't' },
  { hiragana: 'と', romaji: 'to',  alt: [],     family: 'o', row: 't' },
  // N
  { hiragana: 'な', romaji: 'na',  alt: [],     family: 'a', row: 'n' },
  { hiragana: 'に', romaji: 'ni',  alt: [],     family: 'i', row: 'n' },
  { hiragana: 'ぬ', romaji: 'nu',  alt: [],     family: 'u', row: 'n' },
  { hiragana: 'ね', romaji: 'ne',  alt: [],     family: 'e', row: 'n' },
  { hiragana: 'の', romaji: 'no',  alt: [],     family: 'o', row: 'n' },
  // H
  { hiragana: 'は', romaji: 'ha',  alt: [],     family: 'a', row: 'h' },
  { hiragana: 'ひ', romaji: 'hi',  alt: [],     family: 'i', row: 'h' },
  { hiragana: 'ふ', romaji: 'fu',  alt: ['hu'], family: 'u', row: 'h' },
  { hiragana: 'へ', romaji: 'he',  alt: [],     family: 'e', row: 'h' },
  { hiragana: 'ほ', romaji: 'ho',  alt: [],     family: 'o', row: 'h' },
  // M
  { hiragana: 'ま', romaji: 'ma',  alt: [],     family: 'a', row: 'm' },
  { hiragana: 'み', romaji: 'mi',  alt: [],     family: 'i', row: 'm' },
  { hiragana: 'む', romaji: 'mu',  alt: [],     family: 'u', row: 'm' },
  { hiragana: 'め', romaji: 'me',  alt: [],     family: 'e', row: 'm' },
  { hiragana: 'も', romaji: 'mo',  alt: [],     family: 'o', row: 'm' },
  // Y
  { hiragana: 'や', romaji: 'ya',  alt: [],     family: 'a', row: 'y' },
  { hiragana: 'ゆ', romaji: 'yu',  alt: [],     family: 'u', row: 'y' },
  { hiragana: 'よ', romaji: 'yo',  alt: [],     family: 'o', row: 'y' },
  // R
  { hiragana: 'ら', romaji: 'ra',  alt: [],     family: 'a', row: 'r' },
  { hiragana: 'り', romaji: 'ri',  alt: [],     family: 'i', row: 'r' },
  { hiragana: 'る', romaji: 'ru',  alt: [],     family: 'u', row: 'r' },
  { hiragana: 'れ', romaji: 're',  alt: [],     family: 'e', row: 'r' },
  { hiragana: 'ろ', romaji: 'ro',  alt: [],     family: 'o', row: 'r' },
  // W
  { hiragana: 'わ', romaji: 'wa',  alt: [],     family: 'a', row: 'w' },
  { hiragana: 'ゐ', romaji: 'wi',  alt: [],     family: 'i', row: 'w' },
  { hiragana: 'ゑ', romaji: 'we',  alt: [],     family: 'e', row: 'w' },
  { hiragana: 'を', romaji: 'wo',  alt: ['o'],  family: 'o', row: 'w' },
  // Special
  { hiragana: 'ん', romaji: 'n',   alt: ['nn'], family: 'a', row: 'special' },
];

const TABLE_ROWS = [
  { label: '',  key: '' },
  { label: 'K', key: 'k' },
  { label: 'S', key: 's' },
  { label: 'T', key: 't' },
  { label: 'N', key: 'n' },
  { label: 'H', key: 'h' },
  { label: 'M', key: 'm' },
  { label: 'Y', key: 'y' },
  { label: 'R', key: 'r' },
  { label: 'W', key: 'w' },
];

const VOWELS = ['a', 'i', 'u', 'e', 'o'];

const FAMILIES = [
  { key: 'a', name: 'A/N', chars: 'あ か さ た な は ま や ら わ ん' },
  { key: 'i', name: 'I',   chars: 'い き し ち に ひ み り ゐ' },
  { key: 'u', name: 'U',   chars: 'う く す つ ぬ ふ む ゆ る' },
  { key: 'e', name: 'E',   chars: 'え け せ て ね へ め ゑ れ' },
  { key: 'o', name: 'O',   chars: 'お こ そ と の ほ も よ ろ を' },
];

// Build lookup: "row_family" -> char
const CHAR_MAP = {};
ALL_CHARS.forEach(c => { CHAR_MAP[`${c.row}_${c.family}`] = c; });

// ============================================================
// STATE
// ============================================================

const state = {
  selectedFamilies: new Set(),
  mode: null,
  questions: [],
  currentIndex: 0,
  batchStart: 0,
  score: 0,
  totalAnswered: 0,
  firstAttempt: true,
};

// ============================================================
// UTILITY
// ============================================================

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getCharsByFamilies(families) {
  return ALL_CHARS.filter(c => families.has(c.family));
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  renderFamilyOptions();
  setupTabs();
  setupConfig();
  setupExercise();
});

// ============================================================
// TABS
// ============================================================

function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

// ============================================================
// HIRAGANA TABLE
// ============================================================

function renderTable() {
  const table = document.getElementById('hiragana-table');
  const consonants = TABLE_ROWS; // columns
  const n = CHAR_MAP['special_a'];

  let html = '<thead><tr><th></th>';
  consonants.forEach(c => { html += `<th>${c.label || '-'}</th>`; });
  html += '<th></th></tr></thead><tbody>';

  VOWELS.forEach(v => {
    html += `<tr><th>${v}</th>`;
    consonants.forEach(c => {
      const ch = CHAR_MAP[`${c.key}_${v}`];
      if (ch) {
        html += `<td><span class="char">${ch.hiragana}</span><span class="romaji">${ch.romaji}</span></td>`;
      } else {
        html += '<td class="empty"></td>';
      }
    });
    // ん only on the 'a' row
    if (v === 'a') {
      html += `<td rowspan="5" class="special-cell"><span class="char">${n.hiragana}</span><span class="romaji">${n.romaji}</span></td>`;
    }
    html += '</tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
}

// ============================================================
// CONFIG
// ============================================================

function renderFamilyOptions() {
  const container = document.getElementById('family-options');
  FAMILIES.forEach(f => {
    const label = document.createElement('label');
    label.className = 'family-label';
    label.innerHTML = `
      <input type="checkbox" class="family-cb" value="${f.key}">
      <span class="family-name">${f.name}</span>
      <span class="family-chars">${f.chars}</span>
    `;
    container.appendChild(label);
  });
}

function setupConfig() {
  const startBtn = document.getElementById('start-btn');
  const selectAllBtn = document.getElementById('select-all-btn');

  document.getElementById('family-options').addEventListener('change', (e) => {
    if (!e.target.classList.contains('family-cb')) return;
    if (e.target.checked) {
      state.selectedFamilies.add(e.target.value);
    } else {
      state.selectedFamilies.delete(e.target.value);
    }
    updateSelectAllText();
    updateStartBtn();
  });

  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      state.mode = radio.value;
      updateStartBtn();
    });
  });

  selectAllBtn.addEventListener('click', () => {
    const allChecked = state.selectedFamilies.size === FAMILIES.length;
    document.querySelectorAll('.family-cb').forEach(cb => {
      cb.checked = !allChecked;
      if (!allChecked) state.selectedFamilies.add(cb.value);
      else state.selectedFamilies.delete(cb.value);
    });
    updateSelectAllText();
    updateStartBtn();
  });

  startBtn.addEventListener('click', startExercise);

  function updateStartBtn() {
    startBtn.disabled = !(state.selectedFamilies.size > 0 && state.mode);
  }

  function updateSelectAllText() {
    selectAllBtn.textContent = state.selectedFamilies.size === FAMILIES.length
      ? 'Desmarcar todas' : 'Selecionar todas';
  }
}

// ============================================================
// EXERCISE
// ============================================================

function setupExercise() {
  document.getElementById('check-btn').addEventListener('click', checkTyping);
  document.getElementById('romaji-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkTyping();
  });
  document.getElementById('back-btn').addEventListener('click', restart);
  document.getElementById('reveal-btn').addEventListener('click', handleReveal);
  document.getElementById('more-btn').addEventListener('click', addMore);
  document.getElementById('restart-btn').addEventListener('click', restart);
}

function startExercise() {
  state.questions = generateQuestions();
  state.currentIndex = 0;
  state.batchStart = 0;
  state.score = 0;
  state.totalAnswered = 0;

  showPanel('exercise');
  showQuestion();
}

function generateQuestions() {
  return shuffle(getCharsByFamilies(state.selectedFamilies));
}

function showPanel(panel) {
  document.getElementById('config-panel').classList.toggle('hidden', panel !== 'config');
  document.getElementById('exercise-panel').classList.toggle('hidden', panel !== 'exercise');
  document.getElementById('results-panel').classList.toggle('hidden', panel !== 'results');
}

function showQuestion() {
  const q = state.questions[state.currentIndex];
  state.firstAttempt = true;

  updateProgress();
  clearFeedback();
  document.getElementById('reveal-btn').classList.add('hidden');

  const questionChar = document.getElementById('question-char');

  if (state.mode === 'h2r') {
    questionChar.textContent = q.hiragana;
    questionChar.className = '';

    const input = document.getElementById('romaji-input');
    input.value = '';
    input.className = '';
    input.disabled = false;
    setTimeout(() => input.focus(), 50);

    document.getElementById('typing-area').classList.remove('hidden');
    document.getElementById('options-area').classList.add('hidden');
  } else {
    questionChar.textContent = q.romaji;
    questionChar.className = 'romaji-display';

    renderOptions(generateOptions(q), q);

    document.getElementById('typing-area').classList.add('hidden');
    document.getElementById('options-area').classList.remove('hidden');
  }
}

function generateOptions(correct) {
  const options = [correct];
  const usedRomaji = new Set([correct.romaji]);

  // 2 from selected families
  const selectedPool = shuffle(
    getCharsByFamilies(state.selectedFamilies).filter(c => !usedRomaji.has(c.romaji))
  );
  for (const c of selectedPool) {
    if (options.length >= 3) break;
    options.push(c);
    usedRomaji.add(c.romaji);
  }

  // 3 from any family
  const allPool = shuffle(ALL_CHARS.filter(c => !usedRomaji.has(c.romaji)));
  for (const c of allPool) {
    if (options.length >= 6) break;
    options.push(c);
    usedRomaji.add(c.romaji);
  }

  return shuffle(options);
}

function renderOptions(options, correct) {
  const container = document.getElementById('options-area');
  container.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.hiragana;
    btn.addEventListener('click', () => handleOptionClick(btn, opt, correct));
    container.appendChild(btn);
  });
}

function handleOptionClick(btn, selected, correct) {
  if (btn.disabled) return;

  if (selected.romaji === correct.romaji) {
    if (state.firstAttempt) state.score++;
    state.totalAnswered++;
    btn.classList.add('correct');
    disableAllOptions();
    showFeedback(true);
    updateProgress();
    setTimeout(nextQuestion, 700);
  } else {
    state.firstAttempt = false;
    btn.classList.add('wrong');
    btn.disabled = true;
    showFeedback(false);
    document.getElementById('reveal-btn').classList.remove('hidden');
  }
}

function checkTyping() {
  const input = document.getElementById('romaji-input');
  if (input.disabled) return;

  const answer = input.value.trim().toLowerCase();
  if (!answer) return;

  const q = state.questions[state.currentIndex];
  const isCorrect = answer === q.romaji || q.alt.includes(answer);

  if (isCorrect) {
    if (state.firstAttempt) state.score++;
    state.totalAnswered++;
    input.className = 'correct';
    input.disabled = true;
    showFeedback(true);
    updateProgress();
    setTimeout(nextQuestion, 700);
  } else {
    state.firstAttempt = false;
    input.className = 'wrong shake';
    showFeedback(false);
    document.getElementById('reveal-btn').classList.remove('hidden');
    setTimeout(() => {
      input.className = '';
      input.value = '';
      input.focus();
    }, 450);
  }
}

function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}

function handleReveal() {
  const q = state.questions[state.currentIndex];
  state.totalAnswered++;

  document.getElementById('reveal-btn').classList.add('hidden');

  if (state.mode === 'h2r') {
    const input = document.getElementById('romaji-input');
    input.value = q.romaji;
    input.className = 'revealed';
    input.disabled = true;
  } else {
    document.querySelectorAll('.option-btn').forEach(btn => {
      if (btn.textContent === q.hiragana) btn.classList.add('correct');
      btn.disabled = true;
    });
  }

  const el = document.getElementById('feedback');
  el.textContent = state.mode === 'h2r'
    ? `Resposta: ${q.romaji}`
    : `Resposta: ${q.hiragana} (${q.romaji})`;
  el.className = 'revealed';

  updateProgress();
  setTimeout(nextQuestion, 1500);
}

function disableAllOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => { btn.disabled = true; });
}

function updateProgress() {
  const batchPos = state.currentIndex - state.batchStart + 1;
  const batchSize = state.questions.length - state.batchStart;
  document.getElementById('progress').textContent =
    `Questão ${Math.min(batchPos, batchSize)} / ${batchSize}`;
  document.getElementById('score').textContent =
    `Acertos: ${state.score} / ${state.totalAnswered}`;
}

function showFeedback(correct) {
  const el = document.getElementById('feedback');
  el.textContent = correct ? 'Correto!' : 'Tente novamente';
  el.className = correct ? 'correct' : 'wrong';
}

function clearFeedback() {
  const el = document.getElementById('feedback');
  el.textContent = '';
  el.className = '';
}

// ============================================================
// RESULTS
// ============================================================

function showResults() {
  const pct = state.totalAnswered > 0
    ? Math.round((state.score / state.totalAnswered) * 100) : 0;

  document.getElementById('result-score').textContent = state.score;
  document.getElementById('result-total').textContent = state.totalAnswered;
  document.getElementById('result-percent').textContent = `${pct}%`;

  let msg;
  if (pct >= 90) msg = 'Excelente!';
  else if (pct >= 70) msg = 'Bom trabalho!';
  else if (pct >= 50) msg = 'Continue praticando!';
  else msg = 'Não desista, pratique mais!';
  document.getElementById('result-message').textContent = msg;

  const pool = getCharsByFamilies(state.selectedFamilies);
  document.getElementById('more-btn').textContent = `Mais ${pool.length}`;

  showPanel('results');
}

function addMore() {
  const newQuestions = generateQuestions();
  state.batchStart = state.questions.length;
  state.questions = state.questions.concat(newQuestions);
  showPanel('exercise');
  showQuestion();
}

function restart() {
  state.questions = [];
  state.currentIndex = 0;
  state.batchStart = 0;
  state.score = 0;
  state.totalAnswered = 0;
  showPanel('config');
}
