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
                const displayJp = item.kana
                    ? `${item.jp} <span class="kana-small">(${item.kana})</span>`
                    : item.jp;

                tableRows += `
        <tr>
            <td class="jp-column">${displayJp}</td>
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