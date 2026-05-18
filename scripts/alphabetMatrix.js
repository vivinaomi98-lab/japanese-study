function renderAlphabetMatrix(system) {
    if (typeof ALPHABET_DB === 'undefined' || !ALPHABET_DB[system]) return;

    const db = ALPHABET_DB[system];
    
    // Lista completa de colunas na ordem correta de exibição
    const consonants = ['', '-', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W', 'G', 'Z', 'D', 'B', 'P'];
    const vowels = ['a', 'i', 'u', 'e', 'o'];

    // Estrutura bidimensional para busca direta de caracteres
    const charMap = {};
    vowels.forEach(v => charMap[v] = {});

    // Mapeia os itens do banco de dados para a nossa estrutura de grid
    Object.keys(db).forEach(vowelKey => {
        const vowel = vowelKey.replace('vowel_', ''); 
        db[vowelKey].forEach(item => {
            let romaji = item.ro[0];
            let cons = '-';
            
            // Detecta a consoante com base no padrão do Romaji
            if (romaji.length > 1) {
                // Tratamentos especiais para fonemas modificados
                if (romaji.startsWith('sh')) cons = 'S';
                else if (romaji.startsWith('ch') || romaji.startsWith('ts')) cons = 'T';
                else if (romaji.startsWith('fu')) cons = 'H';
                else if (romaji.startsWith('ji')) cons = 'Z'; // ji mapeia na coluna Z
                else if (romaji.startsWith('dj')) cons = 'D'; // dji/dzu mapeiam na coluna D
                else {
                    cons = romaji.charAt(0).toUpperCase();
                }
            } else if (['a', 'i', 'u', 'e', 'o'].includes(romaji)) {
                cons = '-';
            }

            // Ignora o 'n' nesta filtragem, pois ele é tratado à parte na coluna unificada
            if (romaji !== 'n') {
                charMap[vowel][cons] = item;
            }
        });
    });

    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = "1rem";

    const title = document.createElement('h3');
    title.className = 'matrix-title';
    title.textContent = `Tabela Básica de Consulta - Alfabeto ${system.toUpperCase()}`;
    wrapper.appendChild(title);

    const table = document.createElement('table');
    table.className = 'japanese-matrix';

    // Gera a linha de Cabeçalho (Consoantes normais + Dakuten + Handakuten + N)
    let headerRow = '<tr>';
    consonants.forEach(c => headerRow += `<th>${c}</th>`);
    headerRow += '<th>N</th></tr>';
    table.innerHTML += headerRow;

    // Gera as linhas das Vogais
    vowels.forEach((vowel, vIndex) => {
        let rowHtml = `<tr><td class="matrix-vowel">${vowel}</td>`;
        
        // Renderiza cada célula de consoante sequencialmente
        consonants.slice(1).forEach(consonant => {
            const item = charMap[vowel][consonant];
            if (item) {
                rowHtml += `<td class="matrix-cell">${item.jp}<span>${item.ro[0]}</span></td>`;
            } else {
                rowHtml += `<td class="matrix-empty"></td>`;
            }
        });

        // "N" Unificado ocupando o espaço correto na extremidade direita do grid expandido
        if (vIndex === 0) {
            const nItem = db["a"].find(i => i.ro[0] === 'n');
            rowHtml += `<td rowspan="5" class="matrix-cell system-n-cell">${nItem ? nItem.jp : ''}<span>n</span></td>`;
        }

        rowHtml += '</tr>';
        table.innerHTML += rowHtml;
    });

    wrapper.appendChild(table);
    DOM.alphabetMatrixContainer.appendChild(wrapper);
}