// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user, signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Tentando login com:', email);
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.error('Erro no login:', error);
        setError('Credenciais inválidas. Tente novamente.');
        return;
      }
      
      console.log('Login bem sucedido:', data);
      setSuccess('Login realizado com sucesso! Redirecionando...');
      
      // Redirecionar após um breve delay
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
      
    } catch (err) {
      console.error('Erro catch:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Se já estiver logado, redireciona imediatamente
  if (user) {
    console.log('Usuário já logado, redirecionando...');
    window.location.href = '/admin';
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Administrativo</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;