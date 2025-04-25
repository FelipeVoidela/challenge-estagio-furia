// Tipos para jogadores
export interface Jogador {
  id: number;
  nome: string;
  nickname: string;
  funcao: string;
  idade: number;
  foto: string;
  redesSociais: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
  };
  conquistas: string[];
  biografia: string;
  equipe: string; // CS, VALORANT, etc.
}

// Tipos para notícias
export interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  data: string;
  imagem: string;
  categoria: string;
  resumo: string;
  autor: string;
}

// Tipos para partidas
export interface Partida {
  id: number;
  data: string;
  horario: string;
  adversario: string;
  competicao: string;
  modalidade: string; // CS, VALORANT, etc.
  logoAdversario: string;
  ondeAssistir: string[];
  resultado?: {
    placarFuria: number;
    placarAdversario: number;
    status: 'vitória' | 'derrota' | 'empate' | 'pendente';
  };
}

// Tipos para produtos da loja
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  descricao: string;
  disponivel: boolean;
  promocao?: {
    ativo: boolean;
    precoAntigo: number;
    porcentagemDesconto: number;
  };
}

// Tipos para FAQ
export interface FAQ {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: string;
}

// Tipos para conteúdo exclusivo
export interface ConteudoExclusivo {
  id: number;
  titulo: string;
  tipo: 'video' | 'imagem' | 'texto';
  conteudo: string;
  data: string;
  descricao: string;
}

// Tipos para redes sociais
export interface PostRedeSocial {
  id: number;
  plataforma: 'twitter' | 'instagram' | 'facebook';
  conteudo: string;
  data: string;
  imagem?: string;
  link: string;
}

// Tipos para curiosidades e quiz
export interface Curiosidade {
  id: number;
  texto: string;
  categoria: string;
}

export interface PerguntaQuiz {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}
