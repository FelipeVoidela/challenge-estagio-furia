import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

// Importação de componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Chat from './components/Chat/Chat';

// Importação de páginas
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Jogadores from './pages/Jogadores';
import Agenda from './pages/Agenda';
import Loja from './pages/Loja';
import Faq from './pages/Faq';
import ConteudoExclusivo from './pages/ConteudoExclusivo';
import Quiz from './pages/Quiz';
import DetalhesJogador from './pages/DetalhesJogador';
import DetalheNoticia from './pages/DetalheNoticia';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<DetalheNoticia />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/jogadores/:id" element={<DetalhesJogador />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/conteudo-exclusivo" element={<ConteudoExclusivo />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
        <Footer />
        {/* Componente de Chat global, disponível em todas as páginas */}
        <Chat />
      </div>
    </Router>
  );
}

export default App;
