import React, { useState } from 'react';
import './styles.css';
import savingsImg from '../../assets/savings.png';
import logoImg from '../../assets/logo.svg';
import { MdExitToApp } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('login', { email, password });
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.name);

      history.push('/profile');

    } catch (err) {
      alert('Falha no login');
    }
  };

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Money Box" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>

          <input
            placeholder="voce@dominio.com"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Sua senha"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <MdExitToApp size={24} color="#8A63FF" />
            Quero me cadastrar
          </Link>
        </form>
      </section>

      <img src={savingsImg} alt="Savings" />
    </div>
  );
}