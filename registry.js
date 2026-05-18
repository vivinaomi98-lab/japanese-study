/**
 * ==========================================================================
 * REGISTRO CENTRAL DE VOCABULÁRIO
 * ==========================================================================
 */
const JPN_VOCAB_REGISTRY = {
    // Guarda todos os datasets de vocabulário carregados dinamicamente
    datasets: {},

    /**
     * Função única para registrar novas categorias manualmente
     * @param {string} id - O ID que será usado no input radio do HTML (ex: 'verbs', 'colors')
     * @param {string} displayName - O nome que aparecerá no título do Card (ex: 'Verbos Essenciais')
     * @param {Object} data - O objeto contendo as categorias e palavras
     */
    register(id, displayName, data) {
        this.datasets[id] = {
            name: displayName,
            data: data
        };
    },

    // Retorna a lista para renderizar as tabelas no painel de Vocabulário
    getAll() {
        return Object.values(this.datasets);
    },

    // Busca um dataset específico para a tela de Configuração/Exercícios
    get(id) {
        return this.datasets[id] ? this.datasets[id].data : null;
    }
};