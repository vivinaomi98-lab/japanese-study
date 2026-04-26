// ============================================================
// DATA
// ============================================================
const ALL_CHARS = [
  { h: 'あ', k: 'ア', r: 'a',   alt: [],     f: 'a', row: '' },
  { h: 'い', k: 'イ', r: 'i',   alt: [],     f: 'i', row: '' },
  { h: 'う', k: 'ウ', r: 'u',   alt: [],     f: 'u', row: '' },
  { h: 'え', k: 'エ', r: 'e',   alt: [],     f: 'e', row: '' },
  { h: 'お', k: 'オ', r: 'o',   alt: [],     f: 'o', row: '' },
  { h: 'か', k: 'カ', r: 'ka',  alt: [],     f: 'a', row: 'k' },
  { h: 'き', k: 'キ', r: 'ki',  alt: [],     f: 'i', row: 'k' },
  { h: 'く', k: 'ク', r: 'ku',  alt: [],     f: 'u', row: 'k' },
  { h: 'け', k: 'ケ', r: 'ke',  alt: [],     f: 'e', row: 'k' },
  { h: 'こ', k: 'コ', r: 'ko',  alt: [],     f: 'o', row: 'k' },
  { h: 'さ', k: 'サ', r: 'sa',  alt: [],     f: 'a', row: 's' },
  { h: 'し', k: 'シ', r: 'shi', alt: ['si'], f: 'i', row: 's' },
  { h: 'す', k: 'ス', r: 'su',  alt: [],     f: 'u', row: 's' },
  { h: 'せ', k: 'セ', r: 'se',  alt: [],     f: 'e', row: 's' },
  { h: 'そ', k: 'ソ', r: 'so',  alt: [],     f: 'o', row: 's' },
  { h: 'た', k: 'タ', r: 'ta',  alt: [],     f: 'a', row: 't' },
  { h: 'ち', k: 'チ', r: 'chi', alt: ['ti'], f: 'i', row: 't' },
  { h: 'つ', k: 'ツ', r: 'tsu', alt: ['tu'], f: 'u', row: 't' },
  { h: 'て', k: 'テ', r: 'te',  alt: [],     f: 'e', row: 't' },
  { h: 'と', k: 'ト', r: 'to',  alt: [],     f: 'o', row: 't' },
  { h: 'な', k: 'ナ', r: 'na',  alt: [],     f: 'a', row: 'n' },
  { h: 'に', k: 'ニ', r: 'ni',  alt: [],     f: 'i', row: 'n' },
  { h: 'ぬ', k: 'ヌ', r: 'nu',  alt: [],     f: 'u', row: 'n' },
  { h: 'ね', k: 'ネ', r: 'ne',  alt: [],     f: 'e', row: 'n' },
  { h: 'の', k: 'ノ', r: 'no',  alt: [],     f: 'o', row: 'n' },
  { h: 'は', k: 'ハ', r: 'ha',  alt: [],     f: 'a', row: 'h' },
  { h: 'ひ', k: 'ヒ', r: 'hi',  alt: [],     f: 'i', row: 'h' },
  { h: 'ふ', k: 'フ', r: 'fu',  alt: ['hu'], f: 'u', row: 'h' },
  { h: 'へ', k: 'ヘ', r: 'he',  alt: [],     f: 'e', row: 'h' },
  { h: 'ほ', k: 'ホ', r: 'ho',  alt: [],     f: 'o', row: 'h' },
  { h: 'ま', k: 'マ', r: 'ma',  alt: [],     f: 'a', row: 'm' },
  { h: 'み', k: 'ミ', r: 'mi',  alt: [],     f: 'i', row: 'm' },
  { h: 'む', k: 'ム', r: 'mu',  alt: [],     f: 'u', row: 'm' },
  { h: 'め', k: 'メ', r: 'me',  alt: [],     f: 'e', row: 'm' },
  { h: 'も', k: 'モ', r: 'mo',  alt: [],     f: 'o', row: 'm' },
  { h: 'や', k: 'ヤ', r: 'ya',  alt: [],     f: 'a', row: 'y' },
  { h: 'ゆ', k: 'ユ', r: 'yu',  alt: [],     f: 'u', row: 'y' },
  { h: 'よ', k: 'ヨ', r: 'yo',  alt: [],     f: 'o', row: 'y' },
  { h: 'ら', k: 'ラ', r: 'ra',  alt: [],     f: 'a', row: 'r' },
  { h: 'り', k: 'リ', r: 'ri',  alt: [],     f: 'i', row: 'r' },
  { h: 'る', k: 'ル', r: 'ru',  alt: [],     f: 'u', row: 'r' },
  { h: 'れ', k: 'レ', r: 're',  alt: [],     f: 'e', row: 'r' },
  { h: 'ろ', k: 'ロ', r: 'ro',  alt: [],     f: 'o', row: 'r' },
  { h: 'わ', k: 'ワ', r: 'wa',  alt: [],     f: 'a', row: 'w' },
  { h: 'ゐ', k: 'ヰ', r: 'wi',  alt: [],     f: 'i', row: 'w' },
  { h: 'ゑ', k: 'ヱ', r: 'we',  alt: [],     f: 'e', row: 'w' },
  { h: 'を', k: 'ヲ', r: 'wo',  alt: ['o'],  f: 'o', row: 'w' },
  { h: 'ん', k: 'ン', r: 'n',   alt: ['nn'], f: 'a', row: 'special' },
];

const TABLE_ROWS = [
  { label: '', key: '' }, { label: 'K', key: 'k' }, { label: 'S', key: 's' },
  { label: 'T', key: 't' }, { label: 'N', key: 'n' }, { label: 'H', key: 'h' },
  { label: 'M', key: 'm' }, { label: 'Y', key: 'y' }, { label: 'R', key: 'r' },
  { label: 'W', key: 'w' },
];

const VOWELS = ['a', 'i', 'u', 'e', 'o'];

const FAMILIES = [
  { key: 'a', name: 'A/N', chars: 'あ/ア か/カ...' },
  { key: 'i', name: 'I',   chars: 'い/イ き/キ...' },
  { key: 'u', name: 'U',   chars: 'う/ウ く/ク...' },
  { key: 'e', name: 'E',   chars: 'え/エ け/ケ...' },
  { key: 'o', name: 'O',   chars: 'お/オ こ/コ...' },
];

const CHAR_MAP = {};
ALL_CHARS.forEach(c => { CHAR_MAP[`${c.row}_${c.f}`] = c; });

// ============================================================
// STATE
// ============================================================
const state = {
  selectedFamilies: new Set(),
  mode: null,
  scriptType: 'hiragana',
  questions: [],
  currentIndex: 0,
  score: 0,
  totalAnswered: 0,
  firstAttempt: true,
};

// ============================================================
// UTILS
// ============================================================
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================================
// CORE LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderTable('hiragana-table', 'h');
  renderTable('katakana-table', 'k');
  renderFamilyOptions();
  setupTabs();
  setupConfig();
  setupExercise();
});

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

function renderTable(id, typeKey) {
  const table = document.getElementById(id);
  const n = CHAR_MAP['special_a'];
  let html = '<thead><tr><th></th>';
  TABLE_ROWS.forEach(c => { html += `<th>${c.label || '-'}</th>`; });
  html += '<th></th></tr></thead><tbody>';
  VOWELS.forEach(v => {
    html += `<tr><th>${v}</th>`;
    TABLE_ROWS.forEach(c => {
      const ch = CHAR_MAP[`${c.key}_${v}`];
      if (ch) {
        html += `<td><span class="char">${ch[typeKey]}</span><span class="romaji">${ch.r}</span></td>`;
      } else {
        html += '<td class="empty"></td>';
      }
    });
    if (v === 'a') html += `<td rowspan="5" class="special-cell"><span class="char">${n[typeKey]}</span><span class="romaji">${n.r}</span></td>`;
    html += '</tr>';
  });
  table.innerHTML = html + '</tbody>';
}

function renderFamilyOptions() {
  const container = document.getElementById('family-options');
  FAMILIES.forEach(f => {
    const label = document.createElement('label');
    label.className = 'family-label';
    label.innerHTML = `<input type="checkbox" class="family-cb" value="${f.key}">
      <span class="family-name">${f.name}</span> <span class="family-chars">${f.chars}</span>`;
    container.appendChild(label);
  });
}

function setupConfig() {
  const startBtn = document.getElementById('start-btn');
  const selectAllBtn = document.getElementById('select-all-btn');

  document.getElementById('family-options').addEventListener('change', (e) => {
    if (e.target.checked) state.selectedFamilies.add(e.target.value);
    else state.selectedFamilies.delete(e.target.value);
    updateUI();
  });

  document.querySelectorAll('input[name="mode"]').forEach(r => {
    r.addEventListener('change', () => { state.mode = r.value; updateUI(); });
  });

  document.querySelectorAll('input[name="script-type"]').forEach(r => {
    r.addEventListener('change', () => { state.scriptType = r.value; updateUI(); });
  });

  selectAllBtn.addEventListener('click', () => {
    const allChecked = state.selectedFamilies.size === FAMILIES.length;
    document.querySelectorAll('.family-cb').forEach(cb => {
      cb.checked = !allChecked;
      if (!allChecked) state.selectedFamilies.add(cb.value);
      else state.selectedFamilies.delete(cb.value);
    });
    updateUI();
  });

  function updateUI() {
    startBtn.disabled = !(state.selectedFamilies.size > 0 && state.mode);
    selectAllBtn.textContent = state.selectedFamilies.size === FAMILIES.length ? 'Desmarcar todas' : 'Selecionar todas';
  }
  startBtn.addEventListener('click', startExercise);
}

function startExercise() {
  const baseChars = ALL_CHARS.filter(c => state.selectedFamilies.has(c.f));
  state.questions = [];
  baseChars.forEach(c => {
    if (state.scriptType === 'hiragana' || state.scriptType === 'both') 
      state.questions.push({ char: c.h, romaji: c.r, alt: c.alt, type: 'Hiragana' });
    if (state.scriptType === 'katakana' || state.scriptType === 'both') 
      state.questions.push({ char: c.k, romaji: c.r, alt: c.alt, type: 'Katakana' });
  });
  state.questions = shuffle(state.questions);
  state.currentIndex = 0;
  state.score = 0;
  state.totalAnswered = 0;
  showPanel('exercise');
  showQuestion();
}

function showQuestion() {
  const q = state.questions[state.currentIndex];
  state.firstAttempt = true;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = '';
  document.getElementById('reveal-btn').classList.add('hidden');
  document.getElementById('progress').textContent = `Questão ${state.currentIndex + 1} / ${state.questions.length}`;
  document.getElementById('score').textContent = `Acertos: ${state.score} / ${state.totalAnswered}`;

  const display = document.getElementById('question-char');
  if (state.mode === 'h2r') {
    display.textContent = q.char;
    display.className = '';
    const input = document.getElementById('romaji-input');
    input.value = ''; input.className = ''; input.disabled = false;
    document.getElementById('typing-area').classList.remove('hidden');
    document.getElementById('options-area').classList.add('hidden');
    setTimeout(() => input.focus(), 50);
  } else {
    display.textContent = q.romaji;
    display.className = 'romaji-display';
    renderOptions(q);
    document.getElementById('typing-area').classList.add('hidden');
    document.getElementById('options-area').classList.remove('hidden');
  }
}

function checkTyping() {
  const input = document.getElementById('romaji-input');
  if (input.disabled) return;
  
  const q = state.questions[state.currentIndex];
  const val = input.value.trim().toLowerCase();
  if (!val) return;

  const isCorrect = val === q.romaji || q.alt.includes(val);

  if (isCorrect) {
    if (state.firstAttempt) state.score++;
    state.totalAnswered++;
    input.className = 'correct';
    input.disabled = true;
    showFeedback(true);
    setTimeout(nextQuestion, 700);
  } else {
    state.firstAttempt = false;
    input.classList.add('wrong', 'shake');
    showFeedback(false);
    document.getElementById('reveal-btn').classList.remove('hidden');
    setTimeout(() => input.classList.remove('shake'), 400);
  }
}

function renderOptions(correct) {
  const container = document.getElementById('options-area');
  container.innerHTML = '';
  const isK = state.questions[state.currentIndex].type === 'Katakana';
  const distractors = shuffle(ALL_CHARS.filter(c => c.r !== correct.romaji))
                      .slice(0, 5)
                      .map(c => ({ char: isK ? c.k : c.h, romaji: c.r }));
  const options = shuffle([...distractors, { char: correct.char, romaji: correct.romaji }]);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.char;
    btn.onclick = () => {
      if (opt.romaji === correct.romaji) {
        if (state.firstAttempt) state.score++;
        state.totalAnswered++;
        btn.classList.add('correct');
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        showFeedback(true);
        setTimeout(nextQuestion, 700);
      } else {
        state.firstAttempt = false;
        btn.classList.add('wrong');
        btn.disabled = true;
        showFeedback(false);
        document.getElementById('reveal-btn').classList.remove('hidden');
      }
    };
    container.appendChild(btn);
  });
}

function showFeedback(correct) {
  const el = document.getElementById('feedback');
  el.textContent = correct ? 'Correto!' : 'Tente novamente';
  el.className = correct ? 'correct' : 'wrong';
}

function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) showResults();
  else showQuestion();
}

function showResults() {
  const pct = state.totalAnswered > 0 ? Math.round((state.score / state.totalAnswered) * 100) : 0;
  document.getElementById('result-score').textContent = state.score;
  document.getElementById('result-total').textContent = state.totalAnswered;
  document.getElementById('result-percent').textContent = `${pct}%`;
  showPanel('results');
}

function showPanel(p) {
  ['config', 'exercise', 'results'].forEach(id => {
    document.getElementById(`${id}-panel`).classList.toggle('hidden', id !== p);
  });
}

function setupExercise() {
  document.getElementById('check-btn').addEventListener('click', checkTyping);
  document.getElementById('romaji-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkTyping();
  });
  document.getElementById('back-btn').onclick = restart;
  document.getElementById('restart-btn').onclick = restart;
  document.getElementById('more-btn').onclick = startExercise;
  document.getElementById('reveal-btn').onclick = () => {
      const q = state.questions[state.currentIndex];
      const feed = document.getElementById('feedback');
      feed.textContent = `Resposta: ${q.char} (${q.romaji})`;
      feed.className = 'revealed';
      state.totalAnswered++;
      document.getElementById('reveal-btn').classList.add('hidden');
      setTimeout(nextQuestion, 1500);
  };
}

function restart() { showPanel('config'); }
