import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Noticia } from '../types';
import { noticias as noticiasData } from '../services/mockData';
import ButtonLink from '../components/ButtonLink';

const Noticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todas');
  const [termoBusca, setTermoBusca] = useState<string>('');

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setNoticias(noticiasData);
    
    // Extrair categorias únicas para o filtro
    const categorias = Array.from(new Set(noticiasData.map(noticia => noticia.categoria)));
    setCategoriasFiltro(categorias);
  }, []);

  const handleFiltroCategoria = (categoria: string) => {
    setFiltroAtivo(categoria);
  };

  const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const noticiasFiltradas = noticias.filter(noticia => {
    const matchCategoria = filtroAtivo === 'todas' || noticia.categoria === filtroAtivo;
    const matchBusca = termoBusca === '' || 
      noticia.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
      noticia.conteudo.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchCategoria && matchBusca;
  });

  return (
    <div className="noticias-page py-5">
      <Container>
        <h1 className="mb-4">Notícias</h1>
        
        {/* Filtros e Busca */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="d-flex flex-wrap gap-2">
              <ButtonLink 
                to="#"
                variant={filtroAtivo === 'todas' ? 'primary' : 'outline-primary'} 
                className="mb-2"
                onClick={() => handleFiltroCategoria('todas')}
              >
                Todas
              </ButtonLink>
              {categoriasFiltro.map((categoria, index) => (
                <ButtonLink 
                  key={index} 
                  to="#"
                  variant={filtroAtivo === categoria ? 'primary' : 'outline-primary'}
                  className="mb-2"
                  onClick={() => handleFiltroCategoria(categoria)}
                >
                  {categoria}
                </ButtonLink>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                placeholder="Buscar notícias..."
                value={termoBusca}
                onChange={handleBusca}
              />
              <ButtonLink to="#" variant="outline-secondary">
                <i className="bi bi-search"></i>
              </ButtonLink>
            </InputGroup>
          </Col>
        </Row>
        
        {/* Lista de Notícias */}
        <Row>
          {noticiasFiltradas.length > 0 ? (
            noticiasFiltradas.map((noticia) => (
              <Col lg={4} md={6} className="mb-4" key={noticia.id}>
                <Card className="card-furia news-card h-100">
                  <Card.Img 
                    variant="top" 
                    src={noticia.imagem} 
                    alt={noticia.titulo}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/400x200?text=FURIA+News';
                    }}
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Subtitle className="news-date">{noticia.data}</Card.Subtitle>
                      <span className="badge bg-secondary">{noticia.categoria}</span>
                    </div>
                    <Card.Title>{noticia.titulo}</Card.Title>
                    <Card.Text>{noticia.resumo}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    <ButtonLink 
                      to={`/noticias/${noticia.id}`} 
                      variant="primary" 
                      className="btn-furia w-100"
                    >
                      Ler mais
                    </ButtonLink>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p>Nenhuma notícia encontrada com os filtros atuais.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Noticias;
