import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Partida } from '../types';
import { proximasPartidas } from '../services/mockData';

const Agenda: React.FC = () => {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [filtroModalidade, setFiltroModalidade] = useState<string>('todas');
  
  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setPartidas(proximasPartidas);
  }, []);

  const handleFiltroModalidade = (modalidade: string) => {
    setFiltroModalidade(modalidade);
  };

  const partidasFiltradas = partidas.filter(partida => {
    return filtroModalidade === 'todas' || partida.modalidade === filtroModalidade;
  });

  // Extrair modalidades únicas para o filtro
  const modalidades = Array.from(new Set(partidas.map(partida => partida.modalidade)));

  return (
    <div className="agenda-page py-5">
      <Container>
        <h1 className="mb-4">Agenda de Partidas</h1>
        
        {/* Filtros */}
        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <Button 
              variant={filtroModalidade === 'todas' ? 'primary' : 'outline-primary'} 
              onClick={() => handleFiltroModalidade('todas')}
              className="mb-2"
            >
              Todas
            </Button>
            {modalidades.map((modalidade, index) => (
              <Button 
                key={index} 
                variant={filtroModalidade === modalidade ? 'primary' : 'outline-primary'}
                onClick={() => handleFiltroModalidade(modalidade)}
                className="mb-2"
              >
                {modalidade}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Lista de Partidas */}
        <Row>
          {partidasFiltradas.length > 0 ? (
            partidasFiltradas.map((partida) => (
              <Col lg={6} className="mb-4" key={partida.id}>
                <Card className="card-furia match-card h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <Card.Subtitle className="match-date mb-2">
                          {partida.data} - {partida.horario}
                        </Card.Subtitle>
                        <Card.Title className="match-teams">
                          FURIA vs {partida.adversario}
                        </Card.Title>
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
                    
                    <div className="match-details">
                      <p className="mb-2">
                        <Badge bg="secondary" className="me-2">{partida.modalidade}</Badge>
                        {partida.competicao}
                      </p>
                      
                      <div className="match-status">
                        {partida.resultado?.status === 'pendente' ? (
                          <div className="d-flex align-items-center">
                            <span className="badge bg-warning me-2">Aguardando</span>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <Badge 
                              bg={
                                partida.resultado?.status === 'vitória' ? 'success' : 
                                partida.resultado?.status === 'derrota' ? 'danger' : 'secondary'
                              }
                              className="me-2"
                            >
                              {partida.resultado?.status.toUpperCase()}
                            </Badge>
                            <span className="fw-bold">
                              {partida.resultado?.placarFuria} - {partida.resultado?.placarAdversario}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3">
                        <p className="mb-1"><strong>Onde assistir:</strong></p>
                        <div className="d-flex flex-wrap gap-2">
                          {partida.ondeAssistir.map((plataforma, index) => (
                            <Badge key={index} bg="light" text="dark" className="p-2">
                              {plataforma === 'Twitch' && <i className="bi bi-twitch me-1"></i>}
                              {plataforma === 'YouTube' && <i className="bi bi-youtube me-1"></i>}
                              {plataforma}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p>Nenhuma partida encontrada com os filtros atuais.</p>
            </Col>
          )}
        </Row>
        
        {/* Legenda */}
        <div className="mt-4 p-3 bg-light rounded">
          <h5>Legenda:</h5>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <Badge bg="warning" className="me-2">Aguardando</Badge>
              <span>Partida ainda não realizada</span>
            </div>
            <div className="d-flex align-items-center">
              <Badge bg="success" className="me-2">VITÓRIA</Badge>
              <span>FURIA venceu a partida</span>
            </div>
            <div className="d-flex align-items-center">
              <Badge bg="danger" className="me-2">DERROTA</Badge>
              <span>FURIA perdeu a partida</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Agenda;
