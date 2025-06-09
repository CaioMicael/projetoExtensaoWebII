import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <header className="header gradient-bg">
        <Typography variant="h3" className="logo-title">
          <span className="icon-heart">❤️</span> Sistema de Doações
        </Typography>
        <nav>
          <ul className="nav-list">
            <li><Link to="/campanhas">Campanhas</Link></li>
            <li><Link to="/organizacoes">Organizações</Link></li>
            <li><Link to="/dashboard">Painel do Usuário</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Cadastro</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="welcome-section">
          <h2>Bem-vindo ao Sistema de Doações!</h2>
          <p className="desc">Conectando pessoas solidárias a ONGs e órgãos públicos em situações de emergência e no dia a dia.</p>
          <div className="cta-buttons">
            <Link to="/campanhas" className="cta-btn">Ver Campanhas</Link>
            <Link to="/organizacoes" className="cta-btn secondary">Conhecer Organizações</Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          {'© 2025 Sistema de Doações. Todos os direitos reservados.'}
        </Typography>
      </footer>
    </div>
  );
}

export default App;
