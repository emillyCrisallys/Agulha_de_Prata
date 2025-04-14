import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Adicione o caminho correto para o seu CSS
// Adicione o caminho correto para a sua imagem

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('E-mail ou senha inválido');
      return;
    }

    if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

    try {
      const response = await api.post('/login', { email, password });
      console.log('Token recebido:', response.data.token); // Verifique se o token é recebido
      localStorage.setItem('token', response.data.token); // Armazena o token
      navigate('/Home'); // Redireciona para a página protegida
    } catch (err) {
        console.error('Erro ao fazer login:', err);
         setError('E-mail ou senha inválidos sem token');
}
  };

  const handleRegisterClick = () => {
    navigate('/Cadastro'); 
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2>Login</h2>
        <img 
          src="/src/img/Logo_site.png" 
          alt="Logo" 
          className="login-logo" 
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="button-container">
        <button type="submit">Entrar</button>
        <button type="button" className="register-button" onClick={handleRegisterClick} >Cadastrar</button>
    </div>
    </form>
  );
};


export default LoginForm;