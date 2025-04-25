import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import { PerguntaQuiz, Curiosidade } from '../types';
import { perguntasQuiz, curiosidades } from '../services/mockData';

const Quiz: React.FC = () => {
  const [perguntas, setPerguntas] = useState<PerguntaQuiz[]>([]);
  const [curiosidadesList, setCuriosidadesList] = useState<Curiosidade[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState<number>(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [respostaVerificada, setRespostaVerificada] = useState<boolean>(false);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const [quizCompleto, setQuizCompleto] = useState<boolean>(false);
  const [curiosidadeAleatoria, setCuriosidadeAleatoria] = useState<Curiosidade | null>(null);
  const [nomeJogador, setNomeJogador] = useState<string>('');
  const [quizIniciado, setQuizIniciado] = useState<boolean>(false);

  useEffect(() => {
    // Em um cenário real, esses dados viriam de uma API
    setPerguntas(perguntasQuiz);
    setCuriosidadesList(curiosidades);
    
    // Selecionar uma curiosidade aleatória
    const randomIndex = Math.floor(Math.random() * curiosidades.length);
    setCuriosidadeAleatoria(curiosidades[randomIndex]);
  }, []);

  const handleIniciarQuiz = () => {
    if (nomeJogador.trim() === '') {
      alert('Por favor, digite seu nome para iniciar o quiz!');
      return;
    }
    setQuizIniciado(true);
  };

  const handleSelecaoResposta = (index: number) => {
    if (!respostaVerificada) {
      setRespostaSelecionada(index);
    }
  };

  const handleVerificarResposta = () => {
    if (respostaSelecionada === null) return;
    
    setRespostaVerificada(true);
    
    if (respostaSelecionada === perguntas[perguntaAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const handleProximaPergunta = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setRespostaSelecionada(null);
      setRespostaVerificada(false);
      
      // Selecionar uma nova curiosidade aleatória
      const randomIndex = Math.floor(Math.random() * curiosidadesList.length);
      setCuriosidadeAleatoria(curiosidadesList[randomIndex]);
    } else {
      setQuizCompleto(true);
    }
  };

  const handleReiniciarQuiz = () => {
    setPerguntaAtual(0);
    setRespostaSelecionada(null);
    setRespostaVerificada(false);
    setPontuacao(0);
    setQuizCompleto(false);
    
    // Selecionar uma nova curiosidade aleatória
    const randomIndex = Math.floor(Math.random() * curiosidadesList.length);
    setCuriosidadeAleatoria(curiosidadesList[randomIndex]);
  };

  const renderPergunta = () => {
    const pergunta = perguntas[perguntaAtual];
    
    return (
      <Card className="card-furia quiz-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-primary">Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
            <span className="badge bg-secondary">Pontuação: {pontuacao}</span>
          </div>
          
          <Card.Title className="mb-4">{pergunta.pergunta}</Card.Title>
          
          <div className="opcoes-container mb-4">
            {pergunta.opcoes.map((opcao, index) => (
              <div 
                key={index}
                className={`opcao-quiz p-3 mb-2 rounded ${
                  respostaSelecionada === index ? 'opcao-selecionada' : ''
                } ${
                  respostaVerificada && index === pergunta.respostaCorreta ? 'opcao-correta' : ''
                } ${
                  respostaVerificada && respostaSelecionada === index && index !== pergunta.respostaCorreta ? 'opcao-incorreta' : ''
                }`}
                onClick={() => handleSelecaoResposta(index)}
                style={{
                  cursor: respostaVerificada ? 'default' : 'pointer',
                  backgroundColor: respostaSelecionada === index ? '#e9ecef' : 'white',
                  border: respostaSelecionada === index ? '2px solid #00b2ff' : '1px solid #dee2e6',
                  borderLeft: respostaSelecionada === index ? '5px solid #00b2ff' : '1px solid #dee2e6'
                }}
              >
                <div className="d-flex align-items-center">
                  <div 
                    className="opcao-indicador me-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: respostaSelecionada === index ? '#00b2ff' : '#f8f9fa',
                      color: respostaSelecionada === index ? 'white' : 'black'
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>{opcao}</div>
                </div>
              </div>
            ))}
          </div>
          
          {respostaVerificada && (
            <div className="explicacao-container p-3 mb-4 bg-light rounded">
              <h5>Explicação:</h5>
              <p className="mb-0">{pergunta.explicacao}</p>
            </div>
          )}
          
          <div className="d-flex justify-content-between">
            {!respostaVerificada ? (
              <Button 
                variant="primary" 
                className="btn-furia" 
                onClick={handleVerificarResposta}
                disabled={respostaSelecionada === null}
              >
                Verificar Resposta
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="btn-furia" 
                onClick={handleProximaPergunta}
              >
                {perguntaAtual < perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderResultado = () => {
    const percentualAcerto = (pontuacao / perguntas.length) * 100;
    
    return (
      <Card className="card-furia resultado-card text-center">
        <Card.Body>
          <h3 className="mb-4">Quiz Completo!</h3>
          
          <div className="mb-4">
            <h4>Pontuação Final: {pontuacao} de {perguntas.length}</h4>
            <ProgressBar 
              now={percentualAcerto} 
              label={`${percentualAcerto}%`} 
              variant={
                percentualAcerto >= 80 ? 'success' : 
                percentualAcerto >= 50 ? 'warning' : 'danger'
              }
              className="mt-2"
            />
          </div>
          
          <div className="resultado-mensagem p-3 mb-4 rounded" style={{
            backgroundColor: 
              percentualAcerto >= 80 ? '#d4edda' : 
              percentualAcerto >= 50 ? '#fff3cd' : '#f8d7da'
          }}>
            <h5>{
              percentualAcerto >= 80 ? 'Parabéns, você é um verdadeiro fã da FURIA!' : 
              percentualAcerto >= 50 ? 'Bom trabalho! Você conhece bem a FURIA.' : 'Continue acompanhando a FURIA para aprender mais!'
            }</h5>
            <p className="mb-0">
              {nomeJogador}, você acertou {pontuacao} de {perguntas.length} perguntas sobre a FURIA Esports.
            </p>
          </div>
          
          <Button 
            variant="primary" 
            className="btn-furia" 
            onClick={handleReiniciarQuiz}
          >
            Jogar Novamente
          </Button>
        </Card.Body>
      </Card>
    );
  };

  const renderTelaInicial = () => {
    return (
      <Card className="card-furia inicio-quiz-card text-center">
        <Card.Body>
          <h2 className="mb-4">Quiz FURIA</h2>
          <p className="lead mb-4">
            Teste seus conhecimentos sobre a FURIA Esports e descubra o quanto você sabe sobre nossa organização!
          </p>
          
          <div className="mb-4 p-3 bg-light rounded">
            <h5>Como Jogar:</h5>
            <ul className="text-start">
              <li>O quiz contém {perguntas.length} perguntas sobre a FURIA</li>
              <li>Cada pergunta tem 4 alternativas, mas apenas uma é correta</li>
              <li>Você receberá 1 ponto para cada resposta correta</li>
              <li>No final, você verá sua pontuação total</li>
            </ul>
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label>Digite seu nome para começar:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Seu nome" 
              value={nomeJogador}
              onChange={(e) => setNomeJogador(e.target.value)}
              className="mb-3"
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            className="btn-furia" 
            onClick={handleIniciarQuiz}
            size="lg"
          >
            Iniciar Quiz
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="quiz-page py-5">
      <Container>
        <h1 className="mb-4">Quiz FURIA</h1>
        
        <Row>
          <Col lg={8}>
            {!quizIniciado ? (
              renderTelaInicial()
            ) : (
              quizCompleto ? renderResultado() : renderPergunta()
            )}
          </Col>
          
          <Col lg={4}>
            <Card className="card-furia curiosidade-card h-100">
              <Card.Body>
                <h4 className="mb-3">Você Sabia?</h4>
                {curiosidadeAleatoria && (
                  <p>{curiosidadeAleatoria.texto}</p>
                )}
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => {
                      const randomIndex = Math.floor(Math.random() * curiosidadesList.length);
                      setCuriosidadeAleatoria(curiosidadesList[randomIndex]);
                    }}
                  >
                    Próxima Curiosidade
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Quiz;
