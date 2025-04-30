import { Jogador, Noticia, Partida, Produto, FAQ, Curiosidade, PerguntaQuiz} from '../types';
import furiaVitoria2023 from '../assets/images/mock/furiaVitoria2023.webp';
import camisaAdidas from '../assets/images/mock/furiaCamisaAdidas.webp';
import vctFuria from '../assets/images/mock/vctFuriaMwzera.jpg';
import bootcampEuropa from '../assets/images/mock/kscerato-furia-iem-major-rio-2022.jpg';
import furiaAcademy from '../assets/images/mock/furiaAcademy.webp';



// Dados mockados para jogadores
export const jogadoresDestaque: Jogador[] = [
  {
    id: 1,
    nome: 'Gabriel Toledo',
    nickname: 'FalleN',
    funcao: 'AWPer / IGL',
    idade: 33,
    foto: 'https://img-cdn.hltv.org/gallerypicture/ufWlXlNKXinAtC9AfgSPMO.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=160&mx=30&my=710&q=75&w=1200&s=5786743fd620da0e7a29ffc96c54f8a2',
    redesSociais: {
      twitter: 'https://twitter.com/FalleNCS',
      instagram: 'https://www.instagram.com/fallencs/',
      twitch: 'https://www.twitch.tv/fallencs'
    },
    conquistas: [
      'Campeão da ESL One Cologne 2016',
      'Campeão da MLG Columbus 2016',
      'Top 1 HLTV com SK Gaming (2016)',
      'Fundador da organização "Games Academy"'
    ],
    biografia: 'Gabriel "FalleN" Toledo é um dos jogadores mais lendários do cenário de CS:GO. Conhecido como "O Professor", é referência mundial como AWPer e in-game leader. Sua trajetória ajudou a colocar o Brasil no topo do Counter-Strike.',
    equipe: 'CS:GO'
  },
  {
    id: 2,
    nome: 'Kaike Cerato',
    nickname: 'KSCERATO',
    funcao: 'Rifler',
    idade: 25,
    foto: 'https://img-cdn.hltv.org/gallerypicture/dTbDsmrmroXtIyjR4O3IRG.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=160&mx=30&my=710&q=75&w=1200&s=8110f703ee9d1e0c398d0a0ddf552215',
    redesSociais: {
      twitter: 'https://twitter.com/kscerato',
      instagram: 'https://www.instagram.com/kscerato/',
      twitch: 'https://www.twitch.tv/kscerato'
    },
    conquistas: [
      'ESL Pro League Season 12: North America',
      'BLAST Premier: Spring 2020 American Showdown',
      'DreamHack Masters Spring 2020: North America'
    ],
    biografia: 'Kaike "KSCERATO" Cerato é um dos principais riflers da FURIA. Com um talento natural para o jogo, KSCERATO é conhecido por sua precisão e capacidade de clutch em momentos decisivos.',
    equipe: 'CS:GO'
  },
  {
    id: 3,
    nome: 'Yuri Santos',
    nickname: 'yuurih',
    funcao: 'Rifler',
    idade: 24,
    foto: 'https://img-cdn.hltv.org/gallerypicture/4v8OZrrWJ1j883ETZNpCoR.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=160&mx=30&my=710&q=75&w=1200&s=d01e353c942f04ff12d609c5c550c4eb',
    redesSociais: {
      twitter: 'https://twitter.com/yuurihcs',
      instagram: 'https://www.instagram.com/yuurihcs/',
      twitch: 'https://www.twitch.tv/yuurihcs'
    },
    conquistas: [
      'DreamHack Open Summer 2020: North America',
      'ESL Pro League Season 12: North America',
      'Top 20 HLTV 2020 (#14)',
      'Top 20 HLTV 2021 (#19)'
    ],
    biografia: 'Yuri "yuurih" Santos é um dos pilares da FURIA no CS:GO, conhecido por sua consistência e impacto em partidas decisivas. É considerado um dos riflers mais sólidos da América do Sul.',
    equipe: 'CS:GO' 
  },
  {
    id: 4,
    nome: 'Andrei Piovezan',
    nickname: 'art',
    funcao: 'Rifler',
    idade: 27,
    foto: 'https://img-cdn.hltv.org/gallerypicture/0RLCWUQmvFoNhcr3h1JU6S.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=160&mx=30&my=710&q=75&w=1200&s=3cc0d86d27b37c7a34bee1b59f229e91',
    redesSociais: {
      twitter: 'https://twitter.com/artzin',
      instagram: 'https://www.instagram.com/artzincs/',
      twitch: 'https://www.twitch.tv/artzin'
    },
    conquistas: [
      'ESL Pro League Season 12: North America',
      'BLAST Premier: Spring 2020 American Showdown',
      'DreamHack Masters Spring 2020: North America'
    ],
    biografia: 'Andrei "arT" Piovezan é o capitão da equipe de CS:GO da FURIA. Conhecido por seu estilo agressivo e ousado com o AWP, arT é considerado um dos melhores jogadores brasileiros da atualidade.',
    equipe: 'CS:GO'

  }
];

// Dados mockados para notícias
export const noticias: Noticia[] = [
  {
    id: 1,
    titulo: 'FURIA vence e avança para as semifinais do Major',
    conteudo: 'A FURIA venceu a Natus Vincere por 2-1 em uma série emocionante e garantiu vaga nas semifinais do Major. O time brasileiro mostrou um desempenho excepcional, especialmente no mapa decisivo, onde KSCERATO liderou com 28 frags.',
    data: '20/04/2025',
    imagem: furiaVitoria2023,
    categoria: 'CS:GO',
    resumo: 'Equipe brasileira supera Natus Vincere e avança para as semifinais do torneio.',
    autor: 'Equipe FURIA'
  },
  {
    id: 2,
    titulo: 'FURIA anuncia nova linha de produtos em parceria com a Adidas',
    conteudo: 'A FURIA Esports anunciou hoje uma nova linha de produtos em parceria com a Nike. A coleção inclui camisetas, moletons e bonés com design exclusivo, combinando o estilo da Nike com a identidade visual da Adidas.',
    data: '15/04/2025',
    imagem: camisaAdidas,
    categoria: 'Institucional',
    resumo: 'Nova coleção de produtos FURIA x Adidas já está disponível na loja oficial.',
    autor: 'Equipe FURIA'
  },
  {
    id: 3,
    titulo: 'Equipe de VALORANT da FURIA se classifica para o VCT Americas',
    conteudo: 'A equipe de VALORANT da FURIA garantiu sua vaga no VCT Americas após uma campanha impressionante nas classificatórias. O time brasileiro enfrentará as melhores equipes do continente na próxima fase da competição.',
    data: '10/04/2025',
    imagem: vctFuria,
    categoria: 'VALORANT',
    resumo: 'Time brasileiro de VALORANT garante vaga na principal competição das Américas.',
    autor: 'Equipe FURIA'
  },
  {
    id: 4,
    titulo: 'FURIA anuncia bootcamp na Europa para preparação do Major',
    conteudo: 'A FURIA Esports anunciou que realizará um bootcamp na Europa para se preparar para o próximo Major de CS:GO. A equipe ficará hospedada em instalações de ponta em Berlim, onde treinará intensivamente por três semanas.',
    data: '05/04/2025',
    imagem: bootcampEuropa,
    categoria: 'CS:GO',
    resumo: 'Equipe de CS:GO realizará período de treinamento intensivo na Alemanha.',
    autor: 'Equipe FURIA'
  },
  {
    id: 5,
    titulo: 'FURIA lança programa de desenvolvimento para novos talentos',
    conteudo: 'A FURIA Esports lançou hoje o "FURIA Academy", um programa dedicado ao desenvolvimento de novos talentos do cenário brasileiro de esports. O programa oferecerá treinamento, mentoria e oportunidades para jogadores promissores.',
    data: '01/04/2025',
    imagem: furiaAcademy,
    categoria: 'Institucional',
    resumo: 'Programa "FURIA Academy" visa descobrir e desenvolver novos talentos brasileiros.',
    autor: 'Equipe FURIA'
  }
];

// Dados mockados para próximas partidas
export const proximasPartidas: Partida[] = [
  {
    id: 1,
    data: '25/04/2025',
    horario: '15:00',
    adversario: 'Team Liquid',
    competicao: 'ESL Pro League Season 21',
    modalidade: 'CS:GO',
    logoAdversario: 'https://images.seeklogo.com/logo-png/52/1/team-liquid-logo-png_seeklogo-528696.png',
    ondeAssistir: ['Twitch', 'YouTube'],
    resultado: {
      placarFuria: 0,
      placarAdversario: 0,
      status: 'pendente'
    }
  },
  {
    id: 2,
    data: '27/04/2025',
    horario: '18:30',
    adversario: 'Cloud9',
    competicao: 'ESL Pro League Season 21',
    modalidade: 'CS:GO',
    logoAdversario: 'https://images.seeklogo.com/logo-png/51/1/cloud9-logo-png_seeklogo-516995.png',
    ondeAssistir: ['Twitch', 'YouTube'],
    resultado: {
      placarFuria: 0,
      placarAdversario: 0,
      status: 'pendente'
    }
  },
  {
    id: 3,
    data: '30/04/2025',
    horario: '14:00',
    adversario: 'Sentinels',
    competicao: 'VCT Americas',
    modalidade: 'VALORANT',
    logoAdversario: 'https://images.seeklogo.com/logo-png/49/1/sentinels-logo-png_seeklogo-492821.png',
    ondeAssistir: ['Twitch', 'YouTube'],
    resultado: {
      placarFuria: 0,
      placarAdversario: 0,
      status: 'pendente'
    }
  },
  {
    id: 4,
    data: '02/05/2025',
    horario: '16:00',
    adversario: 'LOUD',
    competicao: 'VCT Americas',
    modalidade: 'VALORANT',
    logoAdversario: 'https://images.seeklogo.com/logo-png/45/1/loud-logo-png_seeklogo-452954.png',
    ondeAssistir: ['Twitch', 'YouTube'],
    resultado: {
      placarFuria: 0,
      placarAdversario: 0,
      status: 'pendente'
    }
  }
];

// Dados mockados para produtos da loja
export const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Camisa Oficial FURIA 2025',
    preco: 249.90,
    imagem: 'https://furiagg.fbitsstatic.net/img/p/camiseta-infantil-furia-adidas-preta-150264/337486-2.jpg?w=1280&h=1280&v=202503281015',
    categoria: 'Vestuário',
    descricao: 'Camisa oficial da FURIA para a temporada 2025. Tecido de alta qualidade com tecnologia de respirabilidade.',
    disponivel: true,
    promocao: {
      ativo: false,
      precoAntigo: 299.90,
      porcentagemDesconto: 16
    }
  },
  {
    id: 2,
    nome: 'Moletom FURIA Preto',
    preco: 299.90,
    imagem: 'https://furiagg.fbitsstatic.net/img/p/moletom-careca-furia-classic-2-preto-150186/337164-1.jpg?w=1280&h=1280&v=no-value',
    categoria: 'Vestuário',
    descricao: 'Moletom FURIA na cor preta com logo bordado. Material confortável e quente para o dia a dia.',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Mousepad FURIA XL',
    preco: 129.90,
    imagem: 'https://static.cdnlive.com.br/uploads/602/produto/17399078865294_zoom.jpg',
    categoria: 'Acessórios',
    descricao: 'Mousepad de tamanho extra grande (900x400mm) com superfície de alta precisão e base antiderrapante.',
    disponivel: true,
    promocao: {
      ativo: true,
      precoAntigo: 159.90,
      porcentagemDesconto: 18
    }
  },
  {
    id: 4,
    nome: 'Boné FURIA Snapback',
    preco: 99.90,
    imagem: 'https://furiagg.fbitsstatic.net/img/p/bone-59fifty-furia-x-new-era-preto-e-branco-150193/336989-1.jpg?w=1280&h=1280&v=no-value',
    categoria: 'Acessórios',
    descricao: 'Boné estilo snapback com logo da FURIA bordado. Ajustável e confortável.',
    disponivel: true
  }
];

// Dados mockados para FAQ
export const faqs: FAQ[] = [
  {
    id: 1,
    pergunta: 'Como posso comprar produtos oficiais da FURIA?',
    resposta: 'Você pode adquirir produtos oficiais da FURIA através da nossa loja online em shop.furia.gg ou em revendedores autorizados.',
    categoria: 'Loja'
  },
  {
    id: 2,
    pergunta: 'Onde posso assistir às partidas da FURIA?',
    resposta: 'As partidas da FURIA são transmitidas principalmente na Twitch (twitch.tv/furiatv) e no YouTube (youtube.com/furiagg). Algumas competições também são transmitidas em canais oficiais como ESL, BLAST e Riot Games.',
    categoria: 'Partidas'
  },
  {
    id: 3,
    pergunta: 'Como faço para me tornar um jogador da FURIA?',
    resposta: 'A FURIA realiza seletivas periódicas para suas equipes. Fique atento às nossas redes sociais para informações sobre processos seletivos. Também temos o programa FURIA Academy para desenvolvimento de novos talentos.',
    categoria: 'Institucional'
  },
  {
    id: 4,
    pergunta: 'A FURIA oferece oportunidades de estágio ou emprego?',
    resposta: 'Sim, a FURIA ocasionalmente abre vagas para diversas áreas como marketing, design, produção de conteúdo, entre outras. As oportunidades são divulgadas em nossas redes sociais e no LinkedIn da organização.',
    categoria: 'Institucional'
  },
  {
    id: 5,
    pergunta: 'Como posso entrar em contato com a FURIA?',
    resposta: 'Para contato profissional, envie um e-mail para contato@furia.gg. Para suporte relacionado à loja, utilize suporte@shop.furia.gg. Também respondemos mensagens em nossas redes sociais.',
    categoria: 'Contato'
  }
];

// Dados mockados para curiosidades
export const curiosidades: Curiosidade[] = [
  {
    id: 1,
    texto: 'A FURIA foi fundada em 2017 por Jaime "raizen" Pádua e André "gordo" Akkari.',
    categoria: 'História'
  },
  {
    id: 2,
    texto: 'O nome "FURIA" foi escolhido para representar a paixão e a intensidade com que a organização aborda os esports.',
    categoria: 'História'
  },
  {
    id: 3,
    texto: 'A FURIA foi a primeira organização brasileira a ter uma gaming house na Europa para seu time de CS:GO.',
    categoria: 'CS:GO'
  },
  {
    id: 4,
    texto: 'Em 2021, a FURIA se tornou a primeira organização de esports a ter um patrocínio de uma empresa listada na NYSE (Bolsa de Valores de Nova York).',
    categoria: 'Negócios'
  },
  {
    id: 5,
    texto: 'O jogador arT é conhecido por seu estilo agressivo e único de jogar como AWPer, sendo reconhecido mundialmente por sua abordagem não convencional.',
    categoria: 'CS:GO'
  }
];

// Dados mockados para perguntas de quiz
export const perguntasQuiz: PerguntaQuiz[] = [
  {
    id: 1,
    pergunta: 'Em que ano a FURIA foi fundada?',
    opcoes: ['2016', '2017', '2018', '2019'],
    respostaCorreta: 1,
    explicacao: 'A FURIA Esports foi fundada em 2017 por Jaime "raizen" Pádua e André "gordo" Akkari.'
  },
  {
    id: 2,
    pergunta: 'Qual jogador é o atual capitão da equipe de CS:GO da FURIA?',
    opcoes: ['KSCERATO', 'arT', 'yuurih', 'drop'],
    respostaCorreta: 1,
    explicacao: 'Andrei "arT" Piovezan é o capitão da equipe de CS:GO da FURIA desde sua formação.'
  },
  {
    id: 3,
    pergunta: 'Qual foi o primeiro grande título internacional da FURIA em CS:GO?',
    opcoes: ['ESL Pro League Season 12: North America', 'BLAST Premier: Spring 2020 American Showdown', 'DreamHack Masters Spring 2020: North America', 'IEM Katowice 2020'],
    respostaCorreta: 1,
    explicacao: 'A FURIA conquistou seu primeiro grande título internacional no ESL Pro League Season 12: North America em 2020.'
  },
  {
    id: 4,
    pergunta: 'Em qual modalidade a FURIA NÃO possui uma equipe atualmente?',
    opcoes: ['CS:GO', 'VALORANT', 'Dota 2', 'League of Legends'],
    respostaCorreta: 2,
    explicacao: 'A FURIA atualmente não possui uma equipe de Dota 2. A organização compete em CS:GO, VALORANT, League of Legends, entre outros jogos.'
  },
  {
    id: 5,
    pergunta: 'Qual empresa de material esportivo é parceira oficial da FURIA?',
    opcoes: ['Adidas', 'Nike', 'Puma', 'Under Armour'],
    respostaCorreta: 1,
    explicacao: 'A Nike é a parceira oficial de material esportivo da FURIA, fornecendo uniformes e produtos licenciados.'
  }
];


