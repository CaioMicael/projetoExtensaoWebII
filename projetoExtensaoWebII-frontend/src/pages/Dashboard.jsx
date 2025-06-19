import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/productService';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Painel do Usuário</h2>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </div>
      
      {user && (
        <div className="user-card">
          <h3>{user.name}</h3>
          <div className="user-info">{user.email}</div>
          <div className="user-type">Tipo: <b>{user.type === 'cliente' ? 'Cliente' : 'Estabelecimento'}</b></div>
        </div>
      )}
      
      <div className="products-section">
        <h4>Produtos Disponíveis</h4>
        
        {loading ? (
          <div className="loading">Carregando produtos...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="product-price">R$ {product.price.toFixed(2)}</p>
              </div>            )) : (
              <p>Nenhum produto disponível.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
