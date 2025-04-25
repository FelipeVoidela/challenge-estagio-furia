import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Noticia } from '../types';
import { noticias } from '../services/mockData';
import ButtonLink from '../components/ButtonLink';

const DetalheNoticia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [noticiasRelacionadas, setNoticiasRelacionadas] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  
  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    const noticiaEncontrada = noticias.find(n => n.id === Number(id));
    
    // Buscar notícias relacionadas (mesma categoria)
    if (noticiaEncontrada) {
      const relacionadas = noticias
        .filter(n => n.categoria === noticiaEncontrada.categoria && n.id !== noticiaEncontrada.id)
        .slice(0, 3);
      setNoticiasRelacionadas(relacionadas);
    }
    
    // Simulando um tempo de carregamento
    setTimeout(() => {
      setNoticia(noticiaEncontrada || null);
      setCarregando(false);
    }, 500);
  }, [id]);

  if (carregando) {
    return (
      <div className="detalhe-noticia-page py-5">
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando notícia...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="detalhe-noticia-page py-5">
        <Container>
          <div className="text-center py-5">
            <h2>Notícia não encontrada</h2>
            <p>A notícia que você está procurando não existe ou foi removida.</p>
            <ButtonLink to="/noticias" variant="primary" className="btn-furia mt-3">
              Voltar para Notícias
            </ButtonLink>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="detalhe-noticia-page py-5">
      <Container>
        <div className="mb-4">
          <ButtonLink to="/noticias" variant="outline-primary" className="mb-3">
            <i className="bi bi-arrow-left me-2"></i>Voltar para Notícias
          </ButtonLink>
          
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="card-furia">
                <Card.Img 
                  variant="top" 
                  src={noticia.imagem} 
                  alt={noticia.titulo}
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/800x400?text=FURIA+News';
                  }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Subtitle className="text-muted">{noticia.data}</Card.Subtitle>
                    <Badge bg="secondary">{noticia.categoria}</Badge>
                  </div>
                  
                  <Card.Title as="h1" className="mb-4">{noticia.titulo}</Card.Title>
                  
                  <div className="noticia-autor mb-4">
                    <small className="text-muted">Por {noticia.autor}</small>
                  </div>
                  
                  <div className="noticia-conteudo">
                    <p className="lead mb-4">{noticia.resumo}</p>
                    
                    {/* Aqui dividimos o conteúdo em parágrafos para melhor visualização */}
                    {noticia.conteudo.split('. ').map((paragrafo, index) => (
                      <p key={index}>{paragrafo}.</p>
                    ))}
                  </div>
                  
                  <div className="noticia-compartilhar mt-5 pt-3 border-top">
                    <h5 className="mb-3">Compartilhar:</h5>
                    <div className="d-flex gap-2">
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-twitter me-1"></i>Twitter
                      </a>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-facebook me-1"></i>Facebook
                      </a>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-whatsapp me-1"></i>WhatsApp
                      </a>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-link-45deg me-1"></i>Copiar Link
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="card-furia mb-4">
                <Card.Body>
                  <h4 className="mb-3">Notícias Relacionadas</h4>
                  {noticiasRelacionadas.length > 0 ? (
                    <ListGroup variant="flush">
                      {noticiasRelacionadas.map((noticiaRel) => (
                        <ListGroup.Item key={noticiaRel.id} className="px-0">
                          <ButtonLink to={`/noticias/${noticiaRel.id}`} className="text-decoration-none">
                            <div className="d-flex">
                              <div className="me-3">
                                <img 
                                  src={noticiaRel.imagem} 
                                  alt={noticiaRel.titulo}
                                  style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://via.placeholder.com/80x60?text=FURIA';
                                  }}
                                />
                              </div>
                              <div>
                                <h6 className="mb-1">{noticiaRel.titulo}</h6>
                                <small className="text-muted">{noticiaRel.data}</small>
                              </div>
                            </div>
                          </ButtonLink>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-center">Nenhuma notícia relacionada encontrada.</p>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="card-furia">
                <Card.Body>
                  <h4 className="mb-3">Categorias</h4>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="px-0">
                      <a href="/noticias?categoria=CS:GO" className="text-decoration-none">
                        <i className="bi bi-tag-fill me-2"></i>CS:GO
                      </a>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <a href="/noticias?categoria=VALORANT" className="text-decoration-none">
                        <i className="bi bi-tag-fill me-2"></i>VALORANT
                      </a>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0">
                      <a href="/noticias?categoria=Institucional" className="text-decoration-none">
                        <i className="bi bi-tag-fill me-2"></i>Institucional
                      </a>
                    </ListGroup.Item>
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

export default DetalheNoticia;
