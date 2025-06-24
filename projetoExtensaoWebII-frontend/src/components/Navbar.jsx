import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Sistema de Doações
        </Link>
        
        <div className="navbar-menu">
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/doacoes" className="navbar-link">Doações</Link>
              {isAuthenticated ? (
              <>
                <Link to="/organizacoes" className="navbar-link">Organizações</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Cadastro</Link>
              </>
            )}
          </div>
          
          {isAuthenticated && user && (
            <div className="navbar-user">
              <span className="user-name">Olá, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
