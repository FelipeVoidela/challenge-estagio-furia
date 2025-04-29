// Configuração da API do OpenAI (GPT)

// Para usar o chatbot com a inteligência artificial do GPT,
// você PRECISA substituir a string vazia abaixo pela sua chave de API da OpenAI.
// Obtenha sua chave em: https://platform.openai.com/account/api-keys
export const OPENAI_API_KEY: string = "exemplo"; // <-- COLOQUE SUA CHAVE DE API AQUI (Tipo string explícito)


// Configurações da API (Geralmente não precisam ser alteradas)

export const API_CONFIG = {
  // URL base da API OpenAI
  baseURL: "https://api.openai.com/v1",
  
  // Modelo GPT a ser utilizado (gpt-3.5-turbo é uma boa opção de custo-benefício)
  model: "gpt-3.5-turbo",
  
  // Parâmetros padrão para as chamadas da API (ajustam a criatividade e o tamanho da resposta)
  defaultParams: {
    temperature: 0.7, // Controla a aleatoriedade (0.0 = determinístico, 1.0 = mais criativo)
    max_tokens: 150,  // Limite máximo de tokens na resposta do bot
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }
};

// Instruções para o Chatbot (Define a personalidade e o conhecimento)

export const CHATBOT_INSTRUCTIONS = `
Você é um assistente virtual da FURIA Esports, uma das principais organizações de esports do Brasil.
Seu nome é FURIA Bot.

Algumas informações importantes:
- A FURIA compete em jogos como CS:GO, VALORANT, League of Legends, entre outros.
- Foi fundada em 2017 por Jaime "raizen" Pádua e André "gordo" Akkari.
- Tem parcerias com marcas como Adidas, Red Bull, e outras.
- Seus principais jogadores incluem FalleN, KSCERATO, yuurih e arT no CS:GO, e outros talentos em diferentes modalidades.

Responda perguntas sobre:
- Jogadores e equipes da FURIA (CS:GO, VALORANT, LoL, etc.)
- Próximos jogos e resultados recentes
- História da organização e suas conquistas
- Produtos oficiais e onde comprar (loja online)
- Eventos e notícias relacionadas à FURIA
- Curiosidades sobre a organização e seus membros

Mantenha suas respostas amigáveis, informativas e concisas. Use um tom entusiasmado e positivo, como um verdadeiro torcedor da FURIA.
Evite responder perguntas não relacionadas a esports ou à FURIA.
Se não souber a resposta, diga que não tem essa informação no momento.
`;


// Função de Verificação da Chave (Não alterar)
export const isApiKeyConfigured = (): boolean => { // Garante que a função retorna boolean
  // Verifica se a chave foi preenchida e não é apenas um placeholder
  // Garante que OPENAI_API_KEY é tratado como string
  const key = OPENAI_API_KEY as string;
  // Usa !! para converter explicitamente o resultado para boolean
  return !!(key && key.startsWith("sk-") && key.length > 50);
};

