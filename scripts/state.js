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