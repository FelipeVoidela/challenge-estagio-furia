import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Jogador } from '../types';
import { jogadoresDestaque } from '../services/mockData';
import ButtonLink from '../components/ButtonLink';

const DetalhesJogador: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  
  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    const jogadorEncontrado = jogadoresDestaque.find(j => j.id === Number(id));
    
    // Simulando um tempo de carregamento
    setTimeout(() => {
      setJogador(jogadorEncontrado || null);
      setCarregando(false);
    }, 500);
  }, [id]);

  if (carregando) {
    return (
      <div className="detalhes-jogador-page py-5">
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando informações do jogador...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (!jogador) {
    return (
      <div className="detalhes-jogador-page py-5">
        <Container>
          <div className="text-center py-5">
            <h2>Jogador não encontrado</h2>
            <p>O jogador que você está procurando não existe ou foi removido.</p>
            <ButtonLink to="/jogadores" variant="primary" className="btn-furia mt-3">
              Voltar para Jogadores
            </ButtonLink>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="detalhes-jogador-page py-5">
      <Container>
        <div className="mb-4">
          <ButtonLink to="/jogadores" variant="outline-primary" className="mb-3">
            <i className="bi bi-arrow-left me-2"></i>Voltar para Jogadores
          </ButtonLink>
          
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              <Card className="card-furia h-100">
                <Card.Body className="text-center">
                  <div className="player-image-container mb-4">
                    <img 
                      src={jogador.foto} 
                      alt={jogador.nome}
                      className="player-image img-fluid"
                      style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', border: '4px solid #00b2ff' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/200?text=Jogador';
                      }}
                    />
                  </div>
                  
                  <h2 className="player-nickname mb-2">{jogador.nickname}</h2>
                  <h4 className="player-name text-muted mb-3">{jogador.nome}</h4>
                  
                  <div className="player-badges mb-4">
                    <Badge bg="primary" className="me-2">{jogador.equipe}</Badge>
                    <Badge bg="secondary">{jogador.funcao}</Badge>
                  </div>
                  
                  <div className="player-social-links mb-4">
                    {jogador.redesSociais.twitter && (
                      <a 
                        href={jogador.redesSociais.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary me-2"
                      >
                        <i className="bi bi-twitter me-1"></i>Twitter
                      </a>
                    )}
                    {jogador.redesSociais.instagram && (
                      <a 
                        href={jogador.redesSociais.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary me-2"
                      >
                        <i className="bi bi-instagram me-1"></i>Instagram
                      </a>
                    )}
                    {jogador.redesSociais.twitch && (
                      <a 
                        href={jogador.redesSociais.twitch} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-twitch me-1"></i>Twitch
                      </a>
                    )}
                  </div>
                  
                  <div className="player-info text-start">
                    <p><strong>Idade:</strong> {jogador.idade} anos</p>
                    <p><strong>Função:</strong> {jogador.funcao}</p>
                    <p><strong>Equipe:</strong> {jogador.equipe}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={8}>
              <Card className="card-furia mb-4">
                <Card.Body>
                  <h3 className="mb-3">Biografia</h3>
                  <p>{jogador.biografia}</p>
                </Card.Body>
              </Card>
              
              <Card className="card-furia">
                <Card.Body>
                  <h3 className="mb-3">Conquistas</h3>
                  <ListGroup variant="flush">
                    {jogador.conquistas.map((conquista, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <i className="bi bi-trophy-fill text-warning me-3"></i>
                        {conquista}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default DetalhesJogador;
