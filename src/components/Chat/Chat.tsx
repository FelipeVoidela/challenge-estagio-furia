import React, { useState, useRef, useEffect } from 'react';
import './Chat.scss';
import chatService, { ChatMessage } from '../../services/chatService';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(false);

  // Verificar se a API está configurada
  useEffect(() => {
    setIsApiConfigured(chatService.isConfigured());
  }, []);

  // Mensagem de boas-vindas ao abrir o chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 1,
        text: 'Olá, torcedor da FURIA! Como posso ajudar você hoje?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Rolar para a última mensagem quando uma nova mensagem é adicionada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setIsBotTyping(true);

    try {
      let botResponse: string;
      
      // Usar a API do GPT se configurada, caso contrário usar resposta simulada
      if (isApiConfigured) {
        botResponse = await chatService.sendMessage([...messages, newUserMessage]);
      } else {
        // Simular um atraso para parecer mais natural
        await new Promise(resolve => setTimeout(resolve, 1000));
        botResponse = chatService.simulateResponse(inputMessage);
      }

      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro ao obter resposta do chatbot:', error);
      
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      {/* Botão flutuante para abrir/fechar o chat */}
      <button 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <>
            <i className="bi bi-chat-dots-fill"></i>
            <span className="chat-badge">1</span>
          </>
        )}
      </button>

      {/* Janela do chat */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <img 
              src="/furia-icon.png" 
              alt="FURIA Logo" 
              className="chat-logo"
            />
            <span>FURIA Chat</span>
          </div>
          <button 
            className="chat-close-button" 
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="message bot typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="chat-send-button" 
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === '' || isBotTyping}
            aria-label="Send message"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
        
        {!isApiConfigured && isOpen && (
          <div className="api-notice">
            <p>Modo de demonstração ativo. Para respostas inteligentes, adicione sua chave de API no arquivo apiConfig.ts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
