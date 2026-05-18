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

  // ==========================================================================
  // MODIFICAÇÃO: SUPORTE PARA KANJI + PRONÚNCIA EM JAPONÊS (FURIGANA)
  // ==========================================================================
  if (currentItem.kana) {
    DOM.displayCharacter.innerHTML = `
      <div class="flashcard-kana-wrapper">
        <span class="furigana-reading">${currentItem.kana}</span>
        <span class="main-kanji">${currentItem.jp}</span>
      </div>
    `;
  } else {
    DOM.displayCharacter.textContent = currentItem.jp;
  }

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