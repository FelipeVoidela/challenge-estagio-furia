import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Noticia, Partida, Jogador } from '../types';
import ButtonLink from '../components/ButtonLink';
import LiveStatus from '../components/LiveStatus/LiveStatus';
import FanChatSimulator from '../components/FanChatSimulator/FanChatSimulator';
import backgroundCsHome from '../assets/images/backgrounds/furiaBackgroundCs.jpg';
import backgroundVlrHome from '../assets/images/backgrounds/furiabackgroundVlr.jpg';

// Dados mockados para demonstração
import { noticias, proximasPartidas, jogadoresDestaque } from '../services/mockData';

const Home: React.FC = () => {
  const [noticiasRecentes, setNoticiasRecentes] = useState<Noticia[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setNoticiasRecentes(noticias.slice(0, 3));
    setPartidas(proximasPartidas.slice(0, 4));
    setJogadores(jogadoresDestaque);
  }, []);

  return (
    <div className="home-page">
      {/* Banner Hero */}
      <section className="hero-section">
        <Carousel>
          <Carousel.Item>
            <div 
              className="d-block w-100 "
              style={{
                height: '600px',
                backgroundImage: `url(${backgroundCsHome})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Carousel.Caption>
                <h2>FURIA CS:GO</h2>
                <p>Conheça nosso time de Counter-Strike: Global Offensive</p>
                <ButtonLink to="/jogadores" variant="primary" className="btn-furia">Ver Jogadores</ButtonLink>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div 
              className="d-block w-100"
              style={{
                height: '600px',
                backgroundImage: `url(${backgroundVlrHome})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Carousel.Caption>
                <h2>FURIA VALORANT</h2>
                <p>Conheça nosso time de VALORANT</p>
                <ButtonLink to="/jogadores" variant="primary" className="btn-furia">Ver Jogadores</ButtonLink>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Live Status - Jogos ao Vivo e Chat da Torcida */}
      <section className="live-status-section py-5 bg-dark">
        <Container>
          <Row>
            <Col lg={7}>
              <LiveStatus />
            </Col>
            <Col lg={5}>
              <FanChatSimulator />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Notícias Recentes */}
      <section className="news-section py-5">
        <Container>
          <h2 className="section-title mb-4">Últimas Notícias</h2>
          <Row>
            {noticiasRecentes.map((noticia) => (
              <Col md={4} className="mb-4" key={noticia.id}>
                <Card className="card-furia news-card h-100">
                  <Card.Img 
                    variant="top" 
                    src={noticia.imagem} 
                    alt={noticia.titulo}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Subtitle className="news-date mb-2">{noticia.data}</Card.Subtitle>
                    <Card.Title>{noticia.titulo}</Card.Title>
                    <Card.Text>{noticia.resumo}</Card.Text>
                    <ButtonLink 
                      to={`/noticias/${noticia.id}`} 
                      variant="primary" 
                      className="btn-furia"
                    >
                      Ler mais
                    </ButtonLink>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <ButtonLink to="/noticias" variant="outline-primary">Ver todas as notícias</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Próximas Partidas */}
      <section className="schedule-section py-5 bg-light">
        <Container>
          <h2 className="section-title mb-4">Próximas Partidas</h2>
          <Row>
            {partidas.map((partida) => (
              <Col lg={6} className="mb-4" key={partida.id}>
                <Card className="card-furia match-card">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Subtitle className="match-date mb-2">
                          {partida.data} - {partida.horario}
                        </Card.Subtitle>
                        <Card.Title className="match-teams">
                          FURIA vs {partida.adversario}
                        </Card.Title>
                        <Card.Text className="match-info">
                          {partida.competicao} - {partida.modalidade}
                        </Card.Text>
                        <div className="mt-2">
                          <small>Onde assistir: {partida.ondeAssistir.join(', ')}</small>
                        </div>
                      </div>
                      <div className="text-center">
                        <img 
                          src={partida.logoAdversario} 
                          alt={partida.adversario}
                          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://via.placeholder.com/60?text=Logo';
                          }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <ButtonLink to="/agenda" variant="outline-primary">Ver agenda completa</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Jogadores em Destaque */}
      <section className="player-section py-5">
        <Container>
          <h2 className="section-title mb-4">Jogadores em Destaque</h2>
          <Row>
            {jogadores.map((jogador) => (
              <Col md={3} sm={6} className="mb-4" key={jogador.id}>
                <Card className="card-furia player-card h-100">
                  <Card.Body>
                    <img 
                      src={jogador.foto} 
                      alt={jogador.nome}
                      className="player-image mb-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/150?text=Jogador';
                      }}
                    />
                    <Card.Title className="player-name">{jogador.nickname}</Card.Title>
                    <Card.Subtitle className="player-role mb-2">{jogador.funcao}</Card.Subtitle>
                    <Card.Text className="small">{jogador.equipe}</Card.Text>
                    <ButtonLink 
                      to={`/jogadores/${jogador.id}`} 
                      variant="primary" 
                      className="btn-furia btn-sm mt-2"
                    >
                      Ver perfil
                    </ButtonLink>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <ButtonLink to="/jogadores" variant="outline-primary">Ver todos os jogadores</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5" style={{ backgroundColor: '000000' }}>
        <Container className="text-center text-white">
          <h2 className="mb-4">Faça parte da Família FURIA!</h2>
          <p className="mb-4">Acompanhe nossas redes sociais e fique por dentro de todas as novidades.</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://twitter.com/FURIA" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="bi bi-twitter me-2"></i>Twitter
            </a>
            <a href="https://www.instagram.com/furiagg/" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="bi bi-instagram me-2"></i>Instagram
            </a>
            <a href="https://www.twitch.tv/furiatv" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="bi bi-twitch me-2"></i>Twitch
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
