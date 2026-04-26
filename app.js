const ALL_CHARS = [
    { h: 'あ', k: 'ア', r: 'a', f: 'a', row: '' }, { h: 'い', k: 'イ', r: 'i', f: 'i', row: '' },
    { h: 'う', k: 'ウ', r: 'u', f: 'u', row: '' }, { h: 'え', k: 'エ', r: 'e', f: 'e', row: '' },
    { h: 'お', k: 'オ', r: 'o', f: 'o', row: '' }, { h: 'か', k: 'カ', r: 'ka', f: 'a', row: 'k' },
    { h: 'き', k: 'キ', r: 'ki', f: 'i', row: 'k' }, { h: 'く', k: 'ク', r: 'ku', f: 'u', row: 'k' },
    { h: 'け', k: 'ケ', r: 'ke', f: 'e', row: 'k' }, { h: 'こ', k: 'コ', r: 'ko', f: 'o', row: 'k' },
    { h: 'さ', k: 'サ', r: 'sa', f: 'a', row: 's' }, { h: 'し', k: 'シ', r: 'shi', f: 'i', row: 's' },
    { h: 'す', k: 'ス', r: 'su', f: 'u', row: 's' }, { h: 'せ', k: 'セ', r: 'se', f: 'e', row: 's' },
    { h: 'そ', k: 'ソ', r: 'so', f: 'o', row: 's' }, { h: 'た', k: 'タ', r: 'ta', f: 'a', row: 't' },
    { h: 'ち', k: 'チ', r: 'chi', f: 'i', row: 't' }, { h: 'つ', k: 'ツ', r: 'tsu', f: 'u', row: 't' },
    { h: 'て', k: 'テ', r: 'te', f: 'e', row: 't' }, { h: 'と', k: 'ト', r: 'to', f: 'o', row: 't' },
    { h: 'ん', k: 'ン', r: 'n', f: 'a', row: 'special' }
];

const WORD_CATEGORIES = {
    "Partículas": [{j:'の', r:'no', s:'Posse'}, {j:'に', r:'ni', s:'Destino/Tempo'}, {j:'は', r:'wa', s:'Tópico'}, {j:'を', r:'o', s:'Objeto Direto'}],
    "Pronomes": [{j:'これ', r:'kore', s:'Isto'}, {j:'それ', r:'sore', s:'Isso'}, {j:'どこ', r:'doko', s:'Onde?'}],
    "Cortesia": [{j:'ありがとう', r:'arigatou', s:'Obrigado'}, {j:'はい', r:'hai', s:'Sim'}, {j:'いいえ', r:'iie', s:'Não'}],
    "Verbos": [{j:'たべる', r:'taberu', s:'Comer'}, {j:'のむ', r:'nomu', s:'Beber'}, {j:'わかる', r:'wakaru', s:'Entender'}]
};

const TABLE_ROWS = [{label:'', key:''}, {label:'K', key:'k'}, {label:'S', key:'s'}, {label:'T', key:'t'}];
const VOWELS = ['a', 'i', 'u', 'e', 'o'];
const CHAR_MAP = {};
ALL_CHARS.forEach(c => { CHAR_MAP[`${c.row}_${c.f}`] = c; });

const state = { 
    selectedFamilies: new Set(), questions: [], currentIndex: 0, 
    score: 0, total: 0, mode: 'h2r', firstAttempt: true 
};

document.addEventListener('DOMContentLoaded', () => {
    renderTable('hiragana-table', 'h');
    renderTable('katakana-table', 'k');
    setupUI();
});

function renderTable(id, typeKey) {
    const table = document.getElementById(id);
    let html = '<thead><tr><th></th>' + TABLE_ROWS.map(r => `<th>${r.label}</th>`).join('') + '<th></th></tr></thead><tbody>';
    VOWELS.forEach(v => {
        html += `<tr><th>${v}</th>`;
        TABLE_ROWS.forEach(r => {
            const ch = CHAR_MAP[`${r.key}_${v}`];
            html += ch ? `<td><span class="char">${ch[typeKey]}</span><span class="romaji">${ch.r}</span></td>` : '<td class="empty"></td>';
        });
        if(v === 'a') html += `<td rowspan="5" class="special-cell"><span class="char">${CHAR_MAP['special_a'][typeKey]}</span><span class="romaji">n</span></td>`;
        html += '</tr>';
    });
    table.innerHTML = html + '</tbody>';
}

function setupUI() {
    // Tabs
    document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
        document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
        t.classList.add('active');
        document.getElementById(`tab-${t.dataset.tab}`).classList.add('active');
    });

    // Families
    const famCont = document.getElementById('family-options');
    ['a','i','u','e','o'].forEach(f => {
        famCont.innerHTML += `<label class="family-label"><input type="checkbox" value="${f}" class="fam-cb"> Família ${f.toUpperCase()}</label>`;
    });

    // Exercise Type Toggle
    document.querySelectorAll('input[name="ex-type"]').forEach(r => r.onchange = () => {
        document.getElementById('kana-configs').classList.toggle('hidden', r.value === 'words');
    });

    document.getElementById('start-btn').onclick = startExercise;
    document.getElementById('check-btn').onclick = checkAnswer;
    document.getElementById('romaji-input').onkeyup = (e) => e.key === 'Enter' && checkAnswer();
    document.getElementById('restart-btn').onclick = () => showPanel('config');
    document.getElementById('back-btn').onclick = () => showPanel('config');
}

function startExercise() {
    const type = document.querySelector('input[name="ex-type"]:checked').value;
    state.mode = document.querySelector('input[name="mode"]:checked').value;
    state.questions = [];
    
    if(type === 'kana') {
        const fams = Array.from(document.querySelectorAll('.fam-cb:checked')).map(cb => cb.value);
        const script = document.querySelector('input[name="script-type"]:checked').value;
        ALL_CHARS.filter(c => fams.includes(c.f)).forEach(c => {
            if(script !== 'katakana') state.questions.push({q: c.h, a: c.r, d: '', t: 'Hiragana'});
            if(script !== 'hiragana') state.questions.push({q: c.k, a: c.r, d: '', t: 'Katakana'});
        });
    } else {
        Object.keys(WORD_CATEGORIES).forEach(cat => {
            WORD_CATEGORIES[cat].forEach(w => state.questions.push({q: w.j, a: w.r, d: w.s, t: cat}));
        });
    }

    if(state.questions.length === 0) return alert('Selecione ao menos uma família!');
    state.questions = state.questions.sort(() => Math.random() - 0.5);
    state.currentIndex = 0; state.score = 0; state.total = 0;
    showPanel('exercise');
    showQuestion();
}

function showQuestion() {
    const q = state.questions[state.currentIndex];
    state.firstAttempt = true;
    document.getElementById('progress').textContent = `${q.t} | ${state.currentIndex + 1}/${state.questions.length}`;
    document.getElementById('question-desc').textContent = q.d ? `Significado: ${q.d}` : "";
    document.getElementById('feedback').textContent = "";
    document.getElementById('reveal-btn').classList.add('hidden');

    if(state.mode === 'h2r') {
        document.getElementById('question-char').textContent = q.q;
        document.getElementById('typing-area').classList.remove('hidden');
        document.getElementById('options-area').classList.add('hidden');
        document.getElementById('romaji-input').value = "";
        document.getElementById('romaji-input').disabled = false;
        setTimeout(() => document.getElementById('romaji-input').focus(), 50);
    } else {
        document.getElementById('question-char').textContent = q.a;
        document.getElementById('typing-area').classList.add('hidden');
        document.getElementById('options-area').classList.remove('hidden');
        renderOptions(q);
    }
}

function checkAnswer() {
    const q = state.questions[state.currentIndex];
    const input = document.getElementById('romaji-input');
    if(input.value.toLowerCase().trim() === q.a) {
        if(state.firstAttempt) state.score++;
        state.total++;
        input.style.borderColor = "var(--success)";
        setTimeout(nextQuestion, 600);
    } else {
        state.firstAttempt = false;
        input.classList.add('shake');
        document.getElementById('reveal-btn').classList.remove('hidden');
        setTimeout(() => input.classList.remove('shake'), 400);
    }
}

function renderOptions(correct) {
    const area = document.getElementById('options-area');
    area.innerHTML = "";
    const opts = [correct, ...ALL_CHARS.filter(c => c.r !== correct.a).sort(() => Math.random() - 0.5).slice(0, 5)];
    opts.sort(() => Math.random() - 0.5).forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = o.q || o.h;
        btn.onclick = () => {
            if((o.r || o.a) === correct.a) {
                if(state.firstAttempt) state.score++;
                state.total++;
                btn.style.background = "var(--success)";
                setTimeout(nextQuestion, 600);
            } else {
                state.firstAttempt = false;
                btn.style.background = "var(--danger)";
            }
        };
        area.appendChild(btn);
    });
}

function nextQuestion() {
    state.currentIndex++;
    if(state.currentIndex >= state.questions.length) {
        showPanel('results');
        document.getElementById('res-score').textContent = state.score;
        document.getElementById('res-total').textContent = state.total;
    } else {
        showQuestion();
    }
}

function showPanel(id) {
    document.querySelectorAll('#config-panel, #exercise-panel, #results-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(`${id}-panel`).classList.remove('hidden');
}
