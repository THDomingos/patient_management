import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthHeader } from '../api/axiosConfig.ts';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
      setAuthHeader(username, password);
      try {
      await api.post('/auth/login');
      localStorage.setItem('auth', JSON.stringify({ username, password }));
      navigate('/dashboard');
    } catch (err) {
      console.log("ERRO: ", err)
      alert(err.response?.data?.message || 'Erro ao autenticar. Verifique os dados e tente novamente.');
      setError('Credenciais inválidas!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuário</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
