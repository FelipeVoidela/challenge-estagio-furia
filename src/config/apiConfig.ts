// Configuração da API do OpenAI (GPT)
// Substitua a string vazia pela sua chave de API quando for testar localmente
export const OPENAI_API_KEY = '';

// Configuração da API
export const API_CONFIG = {
  // URL base da API OpenAI
  baseURL: '',
  
  // Modelo GPT a ser utilizado
  model: 'gpt-3.5-turbo',
  
  // Configurações padrão para as chamadas
  defaultParams: {
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }
};

// Instruções para o chatbot
export const CHATBOT_INSTRUCTIONS = `
Você é um assistente virtual da FURIA Esports, uma das principais organizações de esports do Brasil.
Seu nome é FURIA Bot.

Algumas informações importantes:
- A FURIA compete em jogos como CS:GO, VALORANT, League of Legends, entre outros
- Foi fundada em 2017 por Jaime "raizen" Pádua e André "gordo" Akkari
- Tem parcerias com marcas como Adidas
- Seus principais jogadores incluem FalleN, KSCERATO, yuurih e arT

Responda perguntas sobre:
- Jogadores e equipes da FURIA
- Próximos jogos e resultados recentes
- História da organização
- Produtos e loja oficial
- Curiosidades sobre a FURIA

Mantenha suas respostas amigáveis, informativas e concisas. Use um tom entusiasmado, como um verdadeiro fã da FURIA.
`;

// Verificação de segurança para a chave da API
export const isApiKeyConfigured = () => {
  return OPENAI_API_KEY !== '';
};
