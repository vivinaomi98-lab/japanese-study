/**
 * ==========================================================================
 * STATE MANAGEMENT (Estado Central da Aplicação)
 * ==========================================================================
 */
const APP_STATE = {
  currentSource: 'hiragana', // Sistema selecionado na aba de Configuração
  rawLoadedData: null,       // Guarda o dataset ativo para os exercícios
  exercisePool: [],          // Array linear de itens para a aba de exercícios
  currentExerciseIndex: 0    // Índice do card atual no treino
};

// Seletores do DOM reutilizáveis
const DOM = {
  tabs: document.querySelectorAll('.tab-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  sourceRadios: document.querySelectorAll('input[name="source-type"]'),
  checkboxContainer: document.getElementById('category-checkboxes-container'),
  btnStartStudy: document.getElementById('btn-start-study'),
  vocabGrid: document.getElementById('vocab-grid-2x2'),
  alphabetMatrixContainer: document.getElementById('alphabet-matrix-container'),

  // Elementos do Exercício
  displayCharacter: document.getElementById('display-character'),
  displayHint: document.getElementById('display-hint'),
  userAnswer: document.getElementById('user-answer'),
  btnSubmit: document.getElementById('btn-submit-answer'),
  inputWrapper: document.getElementById('input-wrapper'),
  feedbackMessage: document.getElementById('feedback-message'),
  currentIndex: document.getElementById('current-card-index'),
  totalCards: document.getElementById('total-cards-count')
};

/**
 * ==========================================================================
 * 1. ARQUITETURA SPA (Navegação por Abas)
 * ==========================================================================
 */
function initTabs() {
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-target'));
    });
  });
}

function switchTab(targetId) {
  DOM.tabs.forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-target') === targetId) b.classList.add('active');
  });

  DOM.tabContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === targetId) content.classList.add('active');
  });

  // Autofoco automático no campo de texto se for para a tela de exercícios
  if (targetId === 'exercise-screen') {
    setTimeout(() => DOM.userAnswer.focus(), 50);
  }
}

/**
 * ==========================================================================
 * 2. COMPONENTE: PAINEL DE VOCABULÁRIO (Carregamento Geral Simultâneo)
 * ==========================================================================
 */
/**
 * ==========================================================================
 * ATUALIZAÇÃO: CARREGAMENTO COMPLETO DE VOCABULÁRIO (Apenas Alfabeto e Verbos)
 * ==========================================================================
 */
/**
 * ==========================================================================
 * RETORNO AO PADRÃO: CARREGAMENTO COMPLETO DE VOCABULÁRIO (Apenas Alfabeto e Verbos)
 * ==========================================================================
 */
function loadAllVocabularyPanels() {
  // Limpa o container principal das matrizes para evitar duplicações
  DOM.alphabetMatrixContainer.innerHTML = '';

  // Renderiza Ambas as Matrizes do Alfabeto (Hiragana e Katakana) no topo
  renderAlphabetMatrix('hiragana');

  const spacer = document.createElement('div');
  spacer.style.margin = "2.5rem 0";
  DOM.alphabetMatrixContainer.appendChild(spacer);

  renderAlphabetMatrix('katakana');

  // 100% FIEL AO PADRÃO ORIGINAL ANTERIOR: Limpa e renderiza o grid 2x2 padrão
  DOM.vocabGrid.innerHTML = '';
    
  // AUTOMÁTICO: Puxa dinamicamente tudo o que foi registrado no sistema
  const datasets = JPN_VOCAB_REGISTRY.getAll();

  datasets.forEach(set => {
    if (!set.data) return;

    Object.keys(set.data).forEach(categoryName => {
      const items = set.data[categoryName];
      if (items.length === 0) return;

      // Mantém exatamente a estrutura de blocos e classes CSS que você usava antes
      const card = document.createElement('div');
      card.className = 'vocab-category-card';

      let tableRows = '';
      items.forEach(item => {
        const mean = item.pt ? item.pt.join(', ') : item.ro[0];

        tableRows += `
                    <tr>
                        <td class="jp-column">${item.jp}</td>
                        <td>${item.ro.join(' / ')}</td>
                        <td>${mean}</td>
                    </tr>
                `;
      });

      // Restaura o formato HTML original do bloco de categoria
      card.innerHTML = `
                <h3>${categoryName.replace('_', ' ')}</h3>
                <div class="table-wrapper">
                    <table class="vocab-table">
                        <thead>
                            <tr>
                                <th>Japonês</th>
                                <th>Romaji</th>
                                <th>Significado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;
      DOM.vocabGrid.appendChild(card);
    });
  });
}

/**
 * ==========================================================================
 * 3. NOVO MOTOR: MONTAGEM DO GRID GOJŪON (Layout Periódico)
 * ==========================================================================
 */
function renderAlphabetMatrix(system) {
  if (typeof ALPHABET_DB === 'undefined' || !ALPHABET_DB[system]) return;

  const db = ALPHABET_DB[system];
  const consonants = ['', '-', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W'];
  const vowels = ['a', 'i', 'u', 'e', 'o'];

  // Estrutura bidimensional O(1) de mapeamento [vogal][consoante]
  const charMap = {};
  vowels.forEach(v => charMap[v] = {});

  Object.keys(db).forEach(vowelKey => {
    const vowel = vowelKey.replace('vowel_', '');
    db[vowelKey].forEach(item => {
      let romaji = item.ro[0];
      let cons = '-';

      if (romaji.length > 1) {
        cons = romaji.charAt(0).toUpperCase();
        // Alinhamentos fonéticos específicos para casar perfeitamente com a tabela Gojuon padrão
        if (romaji === 'shi') cons = 'S';
        if (romaji === 'chi' || romaji === 'tsu') cons = 'T';
        if (romaji === 'fu') cons = 'H';
      } else if (['a', 'i', 'u', 'e', 'o'].includes(romaji)) {
        cons = '-';
      }

      // Filtra e ignora modificadores Dakuten e Handakuten para manter o layout limpo da imagem
      const isDakutenOrHandakuten = ['ga', 'gi', 'gu', 'ge', 'go', 'za', 'ji', 'zu', 'ze', 'zo', 'da', 'dji', 'dzu', 'de', 'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po'].includes(romaji);
      if (!isDakutenOrHandakuten && romaji !== 'n') {
        charMap[vowel][cons] = item;
      }
    });
  });

  // Início da montagem física da tabela baseada nas regras de CSS estruturadas
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = "1rem";

  const title = document.createElement('h3');
  title.className = 'matrix-title';
  title.textContent = `Tabela Básica de Consulta - Alfabeto ${system.toUpperCase()}`;
  wrapper.appendChild(title);

  const table = document.createElement('table');
  table.className = 'japanese-matrix';

  // Linha das Consoantes (Header)
  let headerRow = '<tr>';
  consonants.forEach(c => headerRow += `<th>${c}</th>`);
  headerRow += '<th></th></tr>'; // Coluna final fantasma para acoplar o rowspan do caractere "N"
  table.innerHTML += headerRow;

  // Linhas das Vogais
  vowels.forEach((vowel, vIndex) => {
    let rowHtml = `<tr><td class="matrix-vowel">${vowel}</td>`;

    consonants.slice(1).forEach(consonant => {
      const item = charMap[vowel][consonant];
      if (item) {
        rowHtml += `<td class="matrix-cell">${item.jp}<span>${item.ro[0]}</span></td>`;
      } else {
        rowHtml += `<td class="matrix-empty"></td>`;
      }
    });

    // Caso especial unificado: Injeção do Caractere "N" na lateral direita ocupando as 5 linhas
    if (vIndex === 0) {
      const nItem = db["vowel_a"].find(i => i.ro[0] === 'n');
      rowHtml += `<td rowspan="5" class="matrix-cell" style="background:#f8f9fa; border: 1px solid #e9ecef;">${nItem ? nItem.jp : ''}<span>n</span></td>`;
    }

    rowHtml += '</tr>';
    table.innerHTML += rowHtml;
  });

  wrapper.appendChild(table);
  DOM.alphabetMatrixContainer.appendChild(wrapper);
}

/**
 * ==========================================================================
 * 4. ABA DE CONFIGURAÇÃO (Seletor Dinâmico de Exercícios)
 * ==========================================================================
 */
function handleSourceChange(e) {
  const sourceType = e.target.value;
  APP_STATE.currentSource = sourceType;

  // Mapeia os dados direto da memória global (Zero Fetch / Sem Erros de CORS)
  if (sourceType === 'hiragana' || sourceType === 'katakana') {
    APP_STATE.rawLoadedData = ALPHABET_DB;
  } else {
    APP_STATE.rawLoadedData = JPN_VOCAB_REGISTRY.get(sourceType);
  }

  renderCategoryCheckboxes();
}

function renderCategoryCheckboxes() {
  DOM.checkboxContainer.innerHTML = '';
  const data = APP_STATE.rawLoadedData;
  let options = [];

  if (!data) {
    DOM.checkboxContainer.innerHTML = `<p class="placeholder-text" style="color:orange;">Aguardando implementação do arquivo JS de vocabulário correspondente.</p>`;
    return;
  }

  if (APP_STATE.currentSource === 'hiragana' || APP_STATE.currentSource === 'katakana') {
    options = Object.keys(data[APP_STATE.currentSource] || {});
  } else {
    options = Object.keys(data);
  }

  options.forEach(opt => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    label.innerHTML = `
            <input type="checkbox" value="${opt}" checked>
            <span class="capitalize">${opt.replace('_', ' ')}</span>
        `;
    DOM.checkboxContainer.appendChild(label);
  });
}

function processSelectedConfig() {
  const checkedBoxes = Array.from(DOM.checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value);

  if (checkedBoxes.length === 0) {
    alert('Por favor, selecione ao menos uma categoria/vogal para estudar.');
    return;
  }

  const sourceData = APP_STATE.rawLoadedData;
  const filteredContent = {};
  APP_STATE.exercisePool = [];

  if (APP_STATE.currentSource === 'hiragana' || APP_STATE.currentSource === 'katakana') {
    const targetSystem = APP_STATE.currentSource;
    checkedBoxes.forEach(vowel => {
      const items = sourceData[targetSystem]?.[vowel] || [];
      if (items.length > 0) filteredContent[vowel] = [...items];
    });
  } else {
    checkedBoxes.forEach(cat => {
      if (sourceData[cat]) filteredContent[cat] = sourceData[cat];
    });
  }

  // Unifica e achata as chaves de dados criando a lista linear de treino
  Object.keys(filteredContent).forEach(cat => {
    APP_STATE.exercisePool.push(...filteredContent[cat]);
  });

  // Embaralha o deck usando algoritmo randômico estável
  APP_STATE.exercisePool.sort(() => Math.random() - 0.5);
  APP_STATE.currentExerciseIndex = 0;

  setupNextExerciseCard();

  // DINÂMICA NOVA: Joga o usuário diretamente para a tela de treino após a confirmação
  switchTab('exercise-screen');
}

/**
 * ==========================================================================
 * 5. MOTOR DE EXERCÍCIOS & FEEDBACK (Auto-Next Ativo)
 * ==========================================================================
 */
function setupNextExerciseCard() {
  DOM.userAnswer.value = '';
  DOM.inputWrapper.className = 'input-wrapper';
  DOM.feedbackMessage.className = 'feedback-message';
  DOM.feedbackMessage.textContent = '';
  DOM.userAnswer.disabled = false;
  DOM.btnSubmit.textContent = "Verificar";

  const pool = APP_STATE.exercisePool;
  if (pool.length === 0 || APP_STATE.currentExerciseIndex >= pool.length) {
    DOM.displayCharacter.textContent = "🎉";
    DOM.displayHint.textContent = "Selecione uma nova configuração na aba inicial para recomeçar.";
    DOM.userAnswer.disabled = true;
    DOM.currentIndex.textContent = pool.length;
    DOM.totalCards.textContent = pool.length;
    return;
  }

  DOM.currentIndex.textContent = APP_STATE.currentExerciseIndex + 1;
  DOM.totalCards.textContent = pool.length;

  const currentItem = pool[APP_STATE.currentExerciseIndex];
  DOM.displayCharacter.textContent = currentItem.jp;

  if (currentItem.kana && currentItem.pt) {
    DOM.displayHint.textContent = `Significado: ${currentItem.pt.join(', ')}`;
  } else if (currentItem.pt) {
    DOM.displayHint.textContent = `Tradução: ${currentItem.pt.join(', ')}`;
  } else {
    DOM.displayHint.textContent = `Digite o som deste caractere em Romaji`;
  }
}

function checkAnswer(isAutoChecking = false) {
  const currentItem = APP_STATE.exercisePool[APP_STATE.currentExerciseIndex];
  if (!currentItem) return;

  if (DOM.btnSubmit.textContent === "Próximo") {
    advanceCard();
    return;
  }

  const inputClean = DOM.userAnswer.value.trim().toLowerCase();
  if (inputClean === '') return;

  const isCorrect = currentItem.ro.map(r => r.toLowerCase()).includes(inputClean);

  if (isCorrect) {
    DOM.inputWrapper.className = 'input-wrapper success';
    DOM.feedbackMessage.className = 'feedback-message success-text';
    DOM.feedbackMessage.textContent = "Correto!";
    DOM.userAnswer.disabled = true;

    // AUTO-NEXT: Aguarda 600ms para exibição da cor verde e pula de card sozinho
    setTimeout(() => {
      advanceCard();
    }, 600);
  } else {
    // Se a checagem foi disparada enquanto digita, não exibe erro ainda para não estragar a UX.
    // O estado de erro só aparece se o usuário forçar via Enter ou clicando no botão.
    if (!isAutoChecking) {
      DOM.inputWrapper.className = 'input-wrapper error';
      DOM.feedbackMessage.className = 'feedback-message error-text';
      const kanaHint = currentItem.kana ? ` [Leitura: ${currentItem.kana}]` : '';
      DOM.feedbackMessage.textContent = `Incorreto. Resposta certa: ${currentItem.ro[0]}${kanaHint}`;
      DOM.btnSubmit.textContent = "Próximo";
    }
  }
}

function advanceCard() {
  APP_STATE.currentExerciseIndex++;
  setupNextExerciseCard();
  DOM.userAnswer.focus();
}

/**
 * ==========================================================================
 * INITIALIZATION (Gatilhos de Inicialização da SPA)
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();

  // Configura os ouvintes dos rádios da tela de configuração
  DOM.sourceRadios.forEach(radio => radio.addEventListener('change', handleSourceChange));

  // Força o carregamento da configuração inicial baseada no rádio marcado por padrão
  const activeRadio = document.querySelector('input[name="source-type"]:checked');
  if (activeRadio) activeRadio.dispatchEvent(new Event('change'));

  DOM.btnStartStudy.addEventListener('click', processSelectedConfig);
  DOM.btnSubmit.addEventListener('click', () => checkAnswer(false));
  DOM.userAnswer.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkAnswer(false); });

  // Escuta em tempo real para disparar a lógica do avanço automático
  DOM.userAnswer.addEventListener('input', () => {
    if (DOM.inputWrapper.classList.contains('error')) {
      DOM.inputWrapper.className = 'input-wrapper';
      DOM.feedbackMessage.textContent = '';
      DOM.btnSubmit.textContent = "Verificar";
    }
    checkAnswer(true);
  });

  // Inicializa carregando todas as tabelas e matrizes completas na aba de Vocabulário
  loadAllVocabularyPanels();
});