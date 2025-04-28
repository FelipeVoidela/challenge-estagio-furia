import React, { useState, useEffect, useRef } from 'react';
import './FanChatSimulator.scss';

// Interface para mensagens de torcedores
interface FanMessage {
  id: number;
  text: string;
  username: string;
  team: 'furia' | 'opponent' | 'neutral';
  timestamp: Date;
}

// Interface para eventos de jogo que podem disparar mensagens
interface GameEvent {
  type: 'goal' | 'kill' | 'round_win' | 'round_loss' | 'match_start' | 'match_end' | 'half_time';
  team: 'furia' | 'opponent';
  player?: string;
  description?: string;
}

interface FanChatSimulatorProps {
  gameId?: number;
  gameType?: 'CS:GO' | 'VALORANT' | 'League of Legends';
  autoScroll?: boolean;
}

const FanChatSimulator: React.FC<FanChatSimulatorProps> = ({ 
  gameId, 
  gameType = 'CS:GO',
  autoScroll = true
}) => {
  const [messages, setMessages] = useState<FanMessage[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Nomes de usuários para simular torcedores
  const furiaFanNames = [
    'FuriaFan123', 'BlackAndBlue', 'VamosFuria', 'FuriaForever', 
    'KsceraTOP', 'FalleNFan', 'ArTzinMonstro', 'YuurihGOD', 
    'BrasilCS', 'FuriaNation', 'TorcidaFuria', 'FuriaEsports'
  ];
  
  const opponentFanNames = [
    'OpponentFan', 'AntiHero', 'NotFuria', 'RivalTeam', 
    'TheOtherSide', 'AgainstAll', 'UnderdogFan', 'ChallengersGG'
  ];
  
  const neutralNames = [
    'EsportsFan', 'Observador', 'Analista', 'CasterBR', 
    'EsportsLover', 'GameEnthusiast', 'TorcedorNeutro', 'JustWatching'
  ];

  // Mensagens pré-definidas para diferentes eventos e sentimentos
  const messageTemplates = {
    furia: {
      positive: [
        'VAMOS FURIA!!! 🔥🔥🔥',
        'QUE JOGADA INCRÍVEL! 👏👏👏',
        'FURIA É MUITO SUPERIOR!',
        'SOMOS OS MELHORES DO BRASIL! 🇧🇷',
        'ESSA VITÓRIA JÁ É NOSSA!',
        'FURIA DOMINANDO COMO SEMPRE! 💪',
        'QUE ORGULHO DESSE TIME!',
        'NINGUÉM PARA A FURIA HOJE!',
        'JOGANDO DEMAIS! VAMOS FURIA!',
        'OLHA O NÍVEL DESSES CARAS! MONSTROS!'
      ],
      negative: [
        'VAMOS FURIA, REAGE! 😫',
        'AINDA DÁ TEMPO DE VIRAR!',
        'NÃO DESISTAM, FURIA! 🙏',
        'PRECISAMOS MELHORAR ISSO...',
        'FURIA ESTÁ NERVOSA HOJE',
        'CALMA, AINDA TEMOS CHANCES!',
        'CONFIANÇA NO TIME! VAMOS VIRAR!',
        'MOMENTO DIFÍCIL, MAS ACREDITO!',
        'FURIA SEMPRE REAGE NOS MOMENTOS DIFÍCEIS',
        'VAMOS RECUPERAR NO PRÓXIMO ROUND!'
      ],
      neutral: [
        'Interessante a estratégia da FURIA hoje',
        'Jogo equilibrado até agora',
        'FURIA precisa ajustar algumas coisas',
        'Vamos ver como o time se adapta',
        'Ainda tem muito jogo pela frente',
        'FURIA está testando novas táticas',
        'Momento de concentração para o time',
        'Jogo difícil, mas FURIA tem potencial',
        'Vamos ver o que o técnico vai mudar',
        'FURIA está jogando diferente hoje'
      ]
    },
    opponent: {
      positive: [
        'Nosso time está jogando muito bem hoje!',
        'Vamos levar essa vitória!',
        'Dominando o jogo completamente!',
        'Ninguém para nosso time hoje!',
        'Jogada espetacular do nosso time!',
        'Estamos mostrando quem é que manda!',
        'Vitória garantida, é só questão de tempo!',
        'Nosso time está inspirado hoje!',
        'Que performance incrível estamos vendo!',
        'Simplesmente imparáveis hoje!'
      ],
      negative: [
        'Vamos, time! Ainda dá para virar!',
        'Não podemos desistir agora!',
        'Momento difícil, mas confio na virada!',
        'Precisamos reagir urgentemente!',
        'Não está sendo nosso dia hoje...',
        'Vamos lutar até o fim!',
        'Ainda acredito na virada!',
        'Não está fácil hoje, mas vamos lutar!',
        'Precisamos de uma mudança de estratégia!',
        'Não vamos desistir!'
      ],
      neutral: [
        'Jogo equilibrado até agora',
        'Ambos os times estão jogando bem',
        'Vamos ver como nosso time se adapta',
        'Ainda tem muito jogo pela frente',
        'Interessante a estratégia do nosso time',
        'Momento de concentração para todos',
        'Jogo difícil para ambos os lados',
        'Vamos ver o que o técnico vai mudar',
        'Precisamos ajustar algumas coisas',
        'Jogo muito técnico até agora'
      ]
    },
    neutral: {
      comments: [
        'Que jogo interessante estamos vendo!',
        'Ambos os times estão muito bem hoje',
        'Nível técnico impressionante nessa partida',
        'Jogo equilibrado, difícil prever o vencedor',
        'Estamos vendo um clássico em andamento',
        'Que partida emocionante!',
        'Os dois times merecem parabéns pelo espetáculo',
        'Estratégias muito bem executadas de ambos os lados',
        'Esse é o tipo de jogo que faz o esport crescer',
        'Independente do resultado, está sendo um grande jogo',
        'Momento decisivo para ambas as equipes',
        'A tensão está no ar, que partida incrível!',
        'Os fãs estão sendo presenteados com um grande espetáculo',
        'Esse é o tipo de jogo que entra para a história',
        'Que nível de competição estamos vendo hoje!'
      ]
    },
    events: {
      match_start: [
        'COMEÇOU! VAMOS FURIA! 🔥',
        'É HOJE QUE A FURIA MOSTRA SEU VALOR!',
        'CHEGOU A HORA! VAMOS FURIA!',
        'QUE COMECE O ESPETÁCULO! FURIA NA ÁREA!',
        'PREPARADOS PARA MAIS UMA VITÓRIA DA FURIA?'
      ],
      match_end: {
        win: [
          'VITÓRIA DA FURIA!!! MERECIDÍSSIMA! 🏆',
          'GANHAMOS!!! FURIA É DEMAIS! 🔥🔥🔥',
          'É POR ISSO QUE SOMOS OS MELHORES! GG!',
          'NUNCA DUVIDEI! FURIA CAMPEÃ! 🏆',
          'QUE VITÓRIA ESPETACULAR! ORGULHO DESSE TIME!'
        ],
        loss: [
          'Infelizmente não foi dessa vez... 😢',
          'Perdemos, mas seguimos confiantes para a próxima!',
          'GG. Vamos aprender com essa derrota e voltar mais fortes!',
          'Dia difícil para a FURIA, mas o time vai se recuperar!',
          'Cabeça erguida! Ainda temos muito campeonato pela frente!'
        ]
      },
      round_win: [
        'ROUND É NOSSO! VAMOS FURIA! 💪',
        'MAIS UM ROUND! DOMINANDO! 🔥',
        'QUE JOGADA PERFEITA PARA FECHAR O ROUND!',
        'FURIA MOSTRANDO COMO SE JOGA!',
        'ROUND IMPECÁVEL! CONTINUE ASSIM!'
      ],
      round_loss: [
        'Perdemos o round, mas vamos recuperar!',
        'Foco no próximo round, FURIA!',
        'Não foi dessa vez, mas seguimos confiantes!',
        'Ajustem a estratégia para o próximo round!',
        'Ainda temos muitos rounds pela frente!'
      ],
      kill: {
        furia: [
          'QUE ABATE INCRÍVEL! 🎯',
          'OLHA O NÍVEL DESSE JOGADOR! MONSTRO!',
          'FURIA FAZENDO A DIFERENÇA!',
          'QUE MIRA PERFEITA! IMPRESSIONANTE!',
          'NINGUÉM PARA ESSE JOGADOR HOJE!'
        ],
        opponent: [
          'Perdemos um, mas vamos recuperar!',
          'Foco, FURIA! Ainda dá para ganhar esse round!',
          'Não foi dessa vez, mas seguimos confiantes!',
          'Cuidado com as emboscadas!',
          'Vamos reagir, FURIA!'
        ]
      },
      half_time: [
        'INTERVALO! FURIA PRECISA AJUSTAR ALGUMAS COISAS',
        'METADE DO JOGO CONCLUÍDA! VAMOS VOLTAR AINDA MAIS FORTES!',
        'HORA DE REPENSAR A ESTRATÉGIA PARA O SEGUNDO TEMPO!',
        'INTERVALO PARA RECUPERAR AS ENERGIAS! VAMOS FURIA!',
        'SEGUNDO TEMPO É NOSSO! CONFIANÇA TOTAL NA FURIA!'
      ]
    }
  };

  // Função para gerar um nome de usuário aleatório com base no time
  const getRandomUsername = (team: 'furia' | 'opponent' | 'neutral') => {
    let names;
    switch (team) {
      case 'furia':
        names = furiaFanNames;
        break;
      case 'opponent':
        names = opponentFanNames;
        break;
      case 'neutral':
        names = neutralNames;
        break;
    }
    return names[Math.floor(Math.random() * names.length)];
  };

  // Função para gerar uma mensagem aleatória com base no tipo e sentimento
  const getRandomMessage = (team: 'furia' | 'opponent' | 'neutral', sentiment: 'positive' | 'negative' | 'neutral' | 'comments' = 'positive') => {
    let messages;
    
    if (team === 'neutral') {
      messages = messageTemplates.neutral.comments;
    } else if (sentiment === 'positive') {
      messages = messageTemplates[team].positive;
    } else if (sentiment === 'negative') {
      messages = messageTemplates[team].negative;
    } else {
      messages = messageTemplates[team].neutral;
    }
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Função para gerar uma mensagem de evento
  const getEventMessage = (event: GameEvent) => {
    switch (event.type) {
      case 'match_start':
        return messageTemplates.events.match_start[Math.floor(Math.random() * messageTemplates.events.match_start.length)];
      
      case 'match_end':
        if (event.team === 'furia') {
          return messageTemplates.events.match_end.win[Math.floor(Math.random() * messageTemplates.events.match_end.win.length)];
        } else {
          return messageTemplates.events.match_end.loss[Math.floor(Math.random() * messageTemplates.events.match_end.loss.length)];
        }
      
      case 'round_win':
        return messageTemplates.events.round_win[Math.floor(Math.random() * messageTemplates.events.round_win.length)];
      
      case 'round_loss':
        return messageTemplates.events.round_loss[Math.floor(Math.random() * messageTemplates.events.round_loss.length)];
      
      case 'kill':
        if (event.team === 'furia') {
          return messageTemplates.events.kill.furia[Math.floor(Math.random() * messageTemplates.events.kill.furia.length)];
        } else {
          return messageTemplates.events.kill.opponent[Math.floor(Math.random() * messageTemplates.events.kill.opponent.length)];
        }
      
      case 'half_time':
        return messageTemplates.events.half_time[Math.floor(Math.random() * messageTemplates.events.half_time.length)];
      
      default:
        return 'Algo aconteceu no jogo!';
    }
  };

  // Função para adicionar uma nova mensagem
  const addMessage = (text: string, team: 'furia' | 'opponent' | 'neutral') => {
    const newMessage: FanMessage = {
      id: messages.length + 1,
      text,
      username: getRandomUsername(team),
      team,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  // Função para simular um evento de jogo
  const simulateGameEvent = (event: GameEvent) => {
    const eventMessage = getEventMessage(event);
    addMessage(eventMessage, 'furia');
    
    // Adicionar algumas reações de outros torcedores
    setTimeout(() => {
      if (Math.random() > 0.3) {
        addMessage(getRandomMessage('furia', event.team === 'furia' ? 'positive' : 'negative'), 'furia');
      }
    }, 1000 + Math.random() * 2000);
    
    setTimeout(() => {
      if (Math.random() > 0.5) {
        addMessage(getRandomMessage('opponent', event.team === 'opponent' ? 'positive' : 'negative'), 'opponent');
      }
    }, 2000 + Math.random() * 3000);
    
    setTimeout(() => {
      if (Math.random() > 0.7) {
        addMessage(getRandomMessage('neutral', 'comments'), 'neutral');
      }
    }, 3000 + Math.random() * 2000);
  };

  // Efeito para inicializar o chat com algumas mensagens
  useEffect(() => {
    // Mensagens iniciais
    const initialMessages = [
      {
        text: 'Bem-vindo ao chat da torcida! Acompanhe a reação dos torcedores em tempo real!',
        team: 'neutral' as const
      },
      {
        text: getRandomMessage('furia', 'positive'),
        team: 'furia' as const
      },
      {
        text: getRandomMessage('opponent', 'neutral'),
        team: 'opponent' as const
      },
      {
        text: getRandomMessage('neutral', 'comments'),
        team: 'neutral' as const
      }
    ];
    
    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        addMessage(msg.text, msg.team);
      }, index * 1000);
    });
    
    // Simular o início da partida
    setTimeout(() => {
      simulateGameEvent({ type: 'match_start', team: 'furia' });
    }, 5000);
    
    // Limpar mensagens ao desmontar
    return () => {
      setMessages([]);
    };
  }, []);

  // Efeito para simular eventos aleatórios durante o jogo
  useEffect(() => {
    if (!isActive) return;
    
    const eventTypes: GameEvent['type'][] = ['kill', 'round_win', 'round_loss', 'half_time'];
    const teams: ('furia' | 'opponent')[] = ['furia', 'opponent'];
    
    // Intervalo para gerar eventos aleatórios
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const randomTeam = teams[Math.floor(Math.random() * teams.length)];
        
        simulateGameEvent({ type: randomEventType, team: randomTeam });
      } else {
        // Às vezes, apenas adicionar mensagens normais de torcedores
        const randomTeam = Math.random() > 0.6 ? 'furia' : (Math.random() > 0.5 ? 'opponent' : 'neutral');
        const sentiment = Math.random() > 0.6 ? 'positive' : (Math.random() > 0.5 ? 'negative' : 'neutral');
        
        addMessage(getRandomMessage(randomTeam, sentiment as any), randomTeam);
      }
    }, 8000 + Math.random() * 7000); // Intervalo aleatório entre 8 e 15 segundos
    
    // Limpar intervalo ao desmontar
    return () => {
      clearInterval(eventInterval);
    };
  }, [isActive]);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Formatar timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fan-chat-simulator">
      <div className="fan-chat-header">
        <h3>
          <i className="bi bi-people-fill me-2"></i>
          Chat da Torcida
        </h3>
        <div className="fan-chat-controls">
          <button 
            className={`toggle-button ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
            title={isActive ? 'Pausar simulação' : 'Iniciar simulação'}
          >
            {isActive ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
          </button>
        </div>
      </div>
      
      <div className="fan-chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`fan-message ${message.team}`}>
            <div className="message-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default FanChatSimulator;
