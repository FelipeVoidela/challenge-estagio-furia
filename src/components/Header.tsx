import React from 'react';
import { Link } from 'react-router-dom';
import logoFuria from '../assets/images/logos/Furia_Esports_logo.png';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-furia">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img 
              src={logoFuria} 
              alt="FURIA Esports Logo" 
              height="40" 
              className="me-2"
            />
            FURIA Esports
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">Início</Link>
              </li>
              <li className="nav-item">
                <Link to="/noticias" className="nav-link">Notícias</Link>
              </li>
              <li className="nav-item">
                <Link to="/jogadores" className="nav-link">Jogadores</Link>
              </li>
              <li className="nav-item">
                <Link to="/agenda" className="nav-link">Agenda</Link>
              </li>
              <li className="nav-item">
                <Link to="/loja" className="nav-link">Loja</Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link">FAQ</Link>
              </li>
              <li className="nav-item">
                <Link to="/conteudo-exclusivo" className="nav-link">Conteúdo Exclusivo</Link>
              </li>
              <li className="nav-item">
                <Link to="/quiz" className="nav-link">Quiz</Link>
              </li>
            </ul>
            <form className="d-flex ms-lg-3">
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Buscar..." aria-label="Buscar" />
                <button className="btn btn-outline-light" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
