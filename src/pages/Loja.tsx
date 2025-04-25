import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Produto } from '../types';
import { produtos } from '../services/mockData';

const Loja: React.FC = () => {
  const [produtosLoja, setProdutosLoja] = useState<Produto[]>([]);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todas');
  const [termoBusca, setTermoBusca] = useState<string>('');

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setProdutosLoja(produtos);
    
    // Extrair categorias únicas para o filtro
    const categorias = Array.from(new Set(produtos.map(produto => produto.categoria)));
    setCategoriasFiltro(categorias);
  }, []);

  const handleFiltroCategoria = (categoria: string) => {
    setFiltroAtivo(categoria);
  };

  const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const produtosFiltrados = produtosLoja.filter(produto => {
    const matchCategoria = filtroAtivo === 'todas' || produto.categoria === filtroAtivo;
    const matchBusca = termoBusca === '' || 
      produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
      produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchCategoria && matchBusca;
  });

  return (
    <div className="loja-page py-5">
      <Container>
        <h1 className="mb-4">Loja FURIA</h1>
        
        {/* Banner da loja */}
        <div className="loja-banner mb-4 p-4 rounded text-white" style={{ backgroundColor: '#00b2ff' }}>
          <Row className="align-items-center">
            <Col md={8}>
              <h2>Produtos Oficiais FURIA</h2>
              <p className="mb-0">Vista-se como um verdadeiro guerreiro FURIA com nossa linha exclusiva de produtos.</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="light" href="https://www.furia.gg" target="_blank" rel="noopener noreferrer">
                Visitar Loja Oficial
              </Button>
            </Col>
          </Row>
        </div>
        
        {/* Filtros e Busca */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="d-flex flex-wrap gap-2">
              <Button 
                variant={filtroAtivo === 'todas' ? 'primary' : 'outline-primary'} 
                onClick={() => handleFiltroCategoria('todas')}
                className="mb-2"
              >
                Todos
              </Button>
              {categoriasFiltro.map((categoria, index) => (
                <Button 
                  key={index} 
                  variant={filtroAtivo === categoria ? 'primary' : 'outline-primary'}
                  onClick={() => handleFiltroCategoria(categoria)}
                  className="mb-2"
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                placeholder="Buscar produtos..."
                value={termoBusca}
                onChange={handleBusca}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        
        {/* Lista de Produtos */}
        <Row>
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <Col lg={3} md={4} sm={6} className="mb-4" key={produto.id}>
                <Card className="card-furia product-card h-100">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={produto.imagem} 
                      alt={produto.nome}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/200x200?text=Produto+FURIA';
                      }}
                    />
                    {produto.promocao?.ativo && (
                      <div className="position-absolute top-0 end-0 bg-danger text-white p-2">
                        {produto.promocao.porcentagemDesconto}% OFF
                      </div>
                    )}
                    {!produto.disponivel && (
                      <div className="position-absolute top-0 start-0 bg-dark text-white p-2">
                        Esgotado
                      </div>
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title>{produto.nome}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{produto.categoria}</Card.Subtitle>
                    <Card.Text className="small">{produto.descricao}</Card.Text>
                    
                    <div className="product-price mt-3">
                      {produto.promocao?.ativo ? (
                        <>
                          <span className="text-decoration-line-through text-muted me-2">
                            R$ {produto.promocao.precoAntigo.toFixed(2)}
                          </span>
                          <span className="fw-bold text-danger">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    <Button 
                      variant="primary" 
                      className="btn-furia w-100"
                      disabled={!produto.disponivel}
                      onClick={() => window.open('https://www.furia.gg', '_blank')}
                    >
                      {produto.disponivel ? 'Comprar' : 'Indisponível'}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p>Nenhum produto encontrado com os filtros atuais.</p>
            </Col>
          )}
        </Row>
        
        {/* Informações adicionais */}
        <div className="mt-5 p-4 bg-light rounded">
          <h4>Informações de Compra</h4>
          <Row>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <i className="bi bi-truck fs-3 me-3"></i>
                <div>
                  <h5 className="mb-1">Entrega</h5>
                  <p className="mb-0 small">Entregamos para todo o Brasil</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card fs-3 me-3"></i>
                <div>
                  <h5 className="mb-1">Pagamento</h5>
                  <p className="mb-0 small">Cartão, boleto e PIX</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check fs-3 me-3"></i>
                <div>
                  <h5 className="mb-1">Segurança</h5>
                  <p className="mb-0 small">Compra 100% segura</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Loja;
