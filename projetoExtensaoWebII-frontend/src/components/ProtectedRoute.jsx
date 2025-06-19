import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente para proteger rotas que requerem autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Mostra um loading spinner enquanto verifica autenticação
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  // Redireciona para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Se estiver autenticado, render o conteúdo da rota
  return children;
};

export default ProtectedRoute;
