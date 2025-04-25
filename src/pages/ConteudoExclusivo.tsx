import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { ConteudoExclusivo as ConteudoExclusivoType } from '../types';

const ConteudoExclusivo: React.FC = () => {
  const [conteudos, setConteudos] = useState<ConteudoExclusivoType[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', senha: '' });
  const [loginError, setLoginError] = useState('');

  // Dados mockados para conteúdo exclusivo
  const conteudosMock: ConteudoExclusivoType[] = [
    {
      id: 1,
      titulo: 'Bastidores da Vitória contra Natus Vincere',
      tipo: 'video',
      conteudo: 'https://furia.gg/videos/bastidores-navi-2025.mp4',
      data: '21/04/2025',
      descricao: 'Veja os bastidores da emocionante vitória da FURIA contra a Natus Vincere nas quartas de final do Major.'
    },
    {
      id: 2,
      titulo: 'Entrevista Exclusiva com arT',
      tipo: 'video',
      conteudo: 'https://furia.gg/videos/entrevista-art-2025.mp4',
      data: '18/04/2025',
      descricao: 'Entrevista exclusiva com o capitão da FURIA, Andrei "arT" Piovezan, sobre a preparação para o Major.'
    },
    {
      id: 3,
      titulo: 'Galeria de Fotos: Bootcamp na Europa',
      tipo: 'imagem',
      conteudo: 'https://furia.gg/images/bootcamp-europa-2025.jpg',
      data: '10/04/2025',
      descricao: 'Confira as fotos exclusivas do bootcamp da FURIA na Europa antes do Major.'
    },
    {
      id: 4,
      titulo: 'Mensagem do CEO para os Fãs',
      tipo: 'texto',
      conteudo: 'Queridos fãs da FURIA, é com grande orgulho que compartilho com vocês os resultados do nosso trabalho nos últimos meses. A classificação para as semifinais do Major é fruto de muito esforço, dedicação e da energia que vocês nos transmitem. Continuem torcendo e apoiando nossa equipe nessa jornada. Juntos somos mais fortes! #DIADEFURIA',
      data: '22/04/2025',
      descricao: 'Mensagem especial do CEO da FURIA, Jaime "raizen" Pádua, para todos os fãs.'
    }
  ];

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API após autenticação
    if (isLoggedIn) {
      setConteudos(conteudosMock);
    } else {
      setConteudos([]);
    }
  }, [isLoggedIn]);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um cenário real, chamada de API para autenticar
    if (loginForm.email && loginForm.senha) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
    } else {
      setLoginError('Por favor, preencha todos os campos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', senha: '' });
  };

  const renderConteudo = (conteudo: ConteudoExclusivoType) => {
    switch (conteudo.tipo) {
      case 'video':
        return (
          <div className="ratio ratio-16x9">
            <video 
              controls 
              poster="https://via.placeholder.com/800x450?text=Video+FURIA"
              className="rounded"
            >
              <source src={conteudo.conteudo} type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>
        );
      case 'imagem':
        return (
          <img 
            src={conteudo.conteudo} 
            alt={conteudo.titulo}
            className="img-fluid rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/800x450?text=Imagem+FURIA';
            }}
          />
        );
      case 'texto':
        return (
          <div className="p-4 bg-light rounded">
            <p className="mb-0">{conteudo.conteudo}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="conteudo-exclusivo-page py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Conteúdo Exclusivo</h1>
          {isLoggedIn ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Sair
            </Button>
          ) : (
            <Button variant="primary" className="btn-furia" onClick={() => setShowLoginModal(true)}>
              Entrar para acessar
            </Button>
          )}
        </div>
        
        {!isLoggedIn ? (
          <div className="text-center py-5 my-5 bg-light rounded">
            <i className="bi bi-lock-fill fs-1 mb-3 text-secondary"></i>
            <h3>Conteúdo Exclusivo para Membros</h3>
            <p className="mb-4">Faça login para acessar conteúdos exclusivos da FURIA.</p>
            <Button variant="primary" className="btn-furia" onClick={() => setShowLoginModal(true)}>
              Entrar
            </Button>
          </div>
        ) : (
          <>
            <p className="lead mb-4">
              Bem-vindo à área de conteúdo exclusivo da FURIA! Aqui você encontra vídeos, fotos e mensagens especiais que só estão disponíveis para nossos membros.
            </p>
            
            <Row>
              {conteudos.map((conteudo) => (
                <Col lg={6} className="mb-4" key={conteudo.id}>
                  <Card className="card-furia h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Card.Subtitle className="text-muted">{conteudo.data}</Card.Subtitle>
                        <span className="badge bg-secondary">
                          {conteudo.tipo === 'video' && 'Vídeo'}
                          {conteudo.tipo === 'imagem' && 'Galeria'}
                          {conteudo.tipo === 'texto' && 'Mensagem'}
                        </span>
                      </div>
                      <Card.Title className="mb-3">{conteudo.titulo}</Card.Title>
                      <Card.Text className="mb-4">{conteudo.descricao}</Card.Text>
                      {renderConteudo(conteudo)}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      
      {/* Modal de Login */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Acesso ao Conteúdo Exclusivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError && (
            <Alert variant="danger" className="mb-3">
              {loginError}
            </Alert>
          )}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={loginForm.email}
                onChange={handleLoginFormChange}
                placeholder="seu@email.com" 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control 
                type="password" 
                name="senha" 
                value={loginForm.senha}
                onChange={handleLoginFormChange}
                placeholder="Sua senha" 
                required 
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" className="btn-furia" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConteudoExclusivo;
