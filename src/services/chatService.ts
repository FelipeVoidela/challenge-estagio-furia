import axios from 'axios';
import { OPENAI_API_KEY, API_CONFIG, CHATBOT_INSTRUCTIONS, isApiKeyConfigured } from '../config/apiConfig';

// Interface para mensagens do chat
export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'fan';
  timestamp: Date;
}

// Interface para o histórico de conversa enviado para a API
interface ConversationHistory {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Classe para gerenciar as interações com a API do GPT
class ChatService {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private defaultParams: any;
  private systemPrompt: string;

  constructor() {
    this.apiKey = OPENAI_API_KEY;
    this.baseURL = API_CONFIG.baseURL;
    this.model = API_CONFIG.model;
    this.defaultParams = API_CONFIG.defaultParams;
    this.systemPrompt = CHATBOT_INSTRUCTIONS;
  }

  // Verifica se a API está configurada
  public isConfigured(): boolean {
    return isApiKeyConfigured();
  }

  // Converte o histórico de mensagens para o formato esperado pela API
  private formatConversationHistory(messages: ChatMessage[]): ConversationHistory[] {
    const history: ConversationHistory[] = [
      {
        role: 'system',
        content: this.systemPrompt
      }
    ];

    // Adiciona apenas as mensagens do usuário e do bot (não as do simulador de torcida)
    messages.filter(msg => msg.sender === 'user' || msg.sender === 'bot').forEach(message => {
      history.push({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.text
      });
    });

    return history;
  }

  // Envia uma mensagem para a API do GPT e retorna a resposta
  public async sendMessage(messages: ChatMessage[]): Promise<string> {
    if (!this.isConfigured()) {
      return "Chave de API não configurada. Por favor, adicione sua chave de API no arquivo apiConfig.ts.";
    }

    try {
      const conversationHistory = this.formatConversationHistory(messages);
      
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: conversationHistory,
          ...this.defaultParams
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      // Extrai a resposta do modelo
      if (response.data && 
          response.data.choices && 
          response.data.choices.length > 0 && 
          response.data.choices[0].message) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('Formato de resposta inesperado da API');
      }
    } catch (error) {
      console.error('Erro ao chamar a API do GPT:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        console.error('Detalhes do erro:', error.response.data);
        return `Erro ao processar sua mensagem: ${error.response.status} - ${error.response.statusText}`;
      }
      
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
    }
  }

  // Método para simular uma resposta quando a API não está configurada (para desenvolvimento)
  public simulateResponse(userMessage: string): string {
    const responses = [
      "Olá, torcedor da FURIA! Como posso ajudar você hoje?",
      "A FURIA tem jogos importantes esta semana! Fique ligado na nossa agenda.",
      "Nosso time de CS:GO está treinando intensamente para o próximo campeonato.",
      "Você já conhece nossa nova linha de produtos? Visite nossa loja online!",
      "FalleN é um dos jogadores mais experientes do nosso time de CS:GO.",
      "A FURIA foi fundada em 2017 e já conquistou diversos títulos importantes.",
      "Nossa equipe de VALORANT está em ótima fase nas competições atuais."
    ];
    
    // Retorna uma resposta aleatória da lista
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export default new ChatService();
