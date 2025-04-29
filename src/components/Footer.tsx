import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>FURIA Esports</h5>
            <p>
              A FURIA é uma organização brasileira de esports fundada em 2017, que compete em diversos jogos como CS:GO, 
              VALORANT, League of Legends, entre outros.
            </p>
            <div className="social-icons">
              <a href="https://twitter.com/FURIA" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://www.instagram.com/furiagg/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.twitch.tv/furiatv" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitch"></i>
              </a>
              <a href="https://www.youtube.com/furiagg" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Links Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/">Início</a></li>
              <li><a href="/noticias">Notícias</a></li>
              <li><a href="/jogadores">Jogadores</a></li>
              <li><a href="/agenda">Agenda</a></li>
              <li><a href="/loja">Loja</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contato</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope me-2"></i> contato@furia.gg</li>
              <li><i className="bi bi-envelope me-2"></i> felipevoidela@gmail.com</li>
              <li><i className="bi bi-geo-alt me-2"></i> São Paulo, Brasil</li>
              <li><a href="/faq">Perguntas Frequentes</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} FURIA Esports.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
