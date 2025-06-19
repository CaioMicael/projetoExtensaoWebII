import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('cliente'); // Adicionar tipo de usuário
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await register({ name, email, password, type });
      setSuccess(true);
      // Redireciona para o dashboard após 1.5 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Erro no registro:', err);
      if (err.response?.data?.errors) {
        // Formatar erros de validação
        const validationErrors = Object.values(err.response.data.errors).flat().join(', ');
        setError(`Erro no cadastro: ${validationErrors}`);
      } else {
        setError(err.response?.data?.message || 'Erro ao realizar o cadastro.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>        <label>Nome</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Senha</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <label>Tipo de Usuário</label>
        <select value={type} onChange={e => setType(e.target.value)} required>
          <option value="cliente">Cliente</option>
          <option value="estabelecimento">Estabelecimento</option>
        </select>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">Cadastro realizado com sucesso!</div>}
        <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
    </div>
  );
}

export default Register;
