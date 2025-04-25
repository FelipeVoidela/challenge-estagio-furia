import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Jogador } from '../types';
import { jogadoresDestaque } from '../services/mockData';

const Jogadores: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [modalidades, setModalidades] = useState<string[]>([]);

  useEffect(() => {
    setJogadores(jogadoresDestaque);
    const modalidadesUnicas = Array.from(new Set(jogadoresDestaque.map(jogador => jogador.equipe)));
    setModalidades(modalidadesUnicas);
  }, []);

  
  if (modalidades.length === 0) {
    return null; 
  }

  return (
    <div className="jogadores-page py-5">
      <Container>
        <h1 className="mb-4 text-center">Nossos Jogadores</h1>

        <Tab.Container id="jogadores-tabs" defaultActiveKey={modalidades[0]}>
          <Row className="mb-4 justify-content-center">
            <Col xs="auto">
              <Nav variant="pills" className="flex-wrap justify-content-center">
                {modalidades.map((modalidade, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={modalidade}>{modalidade}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>

          <Tab.Content>
            {modalidades.map((modalidade, index) => (
              <Tab.Pane key={index} eventKey={modalidade}>
                <Row>
                  {jogadores
                    .filter(jogador => jogador.equipe === modalidade)
                    .map(jogador => (
                      <Col key={jogador.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 text-center card-furia">
                          <div className="player-image-wrapper">
                            <Card.Img 
                              variant="top" 
                              src={jogador.foto} 
                              alt={jogador.nome}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://via.placeholder.com/300x300?text=Jogador';
                              }}
                              className="player-image"
                            />
                          </div>
                          <Card.Body>
                            <Card.Title className="player-name">{jogador.nickname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{jogador.funcao}</Card.Subtitle>
                            <p className="mb-2">{jogador.nome}</p>
                            <p className="mb-3">Idade: {jogador.idade} anos</p>

                            <div className="social-links mb-3">
                              {jogador.redesSociais.twitter && (
                                <a href={jogador.redesSociais.twitter} target="_blank" rel="noopener noreferrer" className="me-2">
                                  <i className="bi bi-twitter"></i>
                                </a>
                              )}
                              {jogador.redesSociais.instagram && (
                                <a href={jogador.redesSociais.instagram} target="_blank" rel="noopener noreferrer" className="me-2">
                                  <i className="bi bi-instagram"></i>
                                </a>
                              )}
                              {jogador.redesSociais.twitch && (
                                <a href={jogador.redesSociais.twitch} target="_blank" rel="noopener noreferrer">
                                  <i className="bi bi-twitch"></i>
                                </a>
                              )}
                            </div>

                            <Link to={`/jogadores/${jogador.id}`} className="btn btn-primary btn-furia btn-sm">
                              Ver perfil completo
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Jogadores;
