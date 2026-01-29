import axios from 'axios';

// PARTE 1: Configuração Base
// Criamos uma instância do Axios com o endereço da RAWG.
// Isso evita que você tenha que digitar o link inteiro toda vez.
const api = axios.create({
  baseURL: 'https://api.rawg.io/api',
});

// PARTE 2: A Função de Busca (Exportada para o App.tsx usar)
export const getGames = async (search: string = '') => {
  // O 'async' avisa que essa função pode demorar um pouco (esperando a internet).
  try {
    const response = await api.get('/games', {
      params: {
        // Buscamos a chave que você salvou no .env.local
        key: import.meta.env.VITE_RAWG_API_KEY, 
        page_size: 12, // Pedimos apenas 12 jogos para não travar
        search: search,
      },
    });

    // Retornamos apenas a lista de jogos que está dentro de 'results'
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return []; // Se der erro, retornamos uma lista vazia para o App não quebrar
  }
};