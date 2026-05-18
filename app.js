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