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