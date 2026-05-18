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