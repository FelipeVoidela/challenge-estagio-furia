import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { FAQ } from '../types';
import { faqs } from '../services/mockData';

const Faq: React.FC = () => {
  const [perguntasFrequentes, setPerguntasFrequentes] = useState<FAQ[]>([]);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todas');
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [perguntaEnviada, setPerguntaEnviada] = useState<boolean>(false);
  const [formPergunta, setFormPergunta] = useState<{nome: string, email: string, pergunta: string}>({
    nome: '',
    email: '',
    pergunta: ''
  });

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setPerguntasFrequentes(faqs);
    
    // Extrair categorias únicas para o filtro
    const categorias = Array.from(new Set(faqs.map(faq => faq.categoria)));
    setCategoriasFiltro(categorias);
  }, []);

  const handleFiltroCategoria = (categoria: string) => {
    setFiltroAtivo(categoria);
  };

  const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormPergunta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPergunta = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um cenário real, enviaríamos para uma API
    console.log('Pergunta enviada:', formPergunta);
    setPerguntaEnviada(true);
    setFormPergunta({
      nome: '',
      email: '',
      pergunta: ''
    });
    
    // Reset do alerta após 5 segundos
    setTimeout(() => {
      setPerguntaEnviada(false);
    }, 5000);
  };

  const perguntasFiltradas = perguntasFrequentes.filter(faq => {
    const matchCategoria = filtroAtivo === 'todas' || faq.categoria === filtroAtivo;
    const matchBusca = termoBusca === '' || 
      faq.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) || 
      faq.resposta.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchCategoria && matchBusca;
  });

  return (
    <div className="faq-page py-5">
      <Container>
        <h1 className="mb-4">Perguntas Frequentes</h1>
        
        {/* Filtros e Busca */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="d-flex flex-wrap gap-2">
              <Button 
                variant={filtroAtivo === 'todas' ? 'primary' : 'outline-primary'} 
                onClick={() => handleFiltroCategoria('todas')}
                className="mb-2"
              >
                Todas
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
                placeholder="Buscar perguntas..."
                value={termoBusca}
                onChange={handleBusca}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        
        {/* Lista de FAQs */}
        <Row className="mb-5">
          <Col>
            {perguntasFiltradas.length > 0 ? (
              <Accordion defaultActiveKey="0">
                {perguntasFiltradas.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={faq.id}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center w-100">
                        <span className="me-auto">{faq.pergunta}</span>
                        <span className="badge bg-secondary ms-2">{faq.categoria}</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {faq.resposta}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-4">
                <p>Nenhuma pergunta encontrada com os filtros atuais.</p>
              </div>
            )}
          </Col>
        </Row>
        
        {/* Formulário para novas perguntas */}
        <Row>
          <Col lg={8} className="mx-auto">
            <div className="bg-light p-4 rounded">
              <h3 className="mb-4">Não encontrou o que procurava?</h3>
              
              {perguntaEnviada && (
                <Alert variant="success" className="mb-4">
                  Sua pergunta foi enviada com sucesso! Responderemos em breve.
                </Alert>
              )}
              
              <Form onSubmit={handleSubmitPergunta}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formNome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="nome" 
                        value={formPergunta.nome}
                        onChange={handleFormChange}
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formPergunta.email}
                        onChange={handleFormChange}
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formPergunta">
                  <Form.Label>Sua pergunta</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="pergunta"
                    value={formPergunta.pergunta}
                    onChange={handleFormChange}
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-furia">
                  Enviar pergunta
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Faq;
