import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    if (password === passwordConfirmation) {

      const data = {
        name,
        email,
        password
      };

      try {
        const response = await api.post('users', data);
        console.log(response.data);
        
        alert('Cadastro realizado com sucesso!');

        history.push('/');

      } catch (err) {
        alert('Erro no cadastro.');
      }
    } else {
      alert('Sua senha e confirmação devem ser as mesmas');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="Money Box" />

          <h1>Cadastre-se</h1>
          <p>Faça seu cadastro, entre na plataforma e alcance seus objetivos através do modelo
            <span className="text-highlight"> MONEY BOX</span>.
          </p>

          <Link className="back-link" to="/">
            <MdKeyboardBackspace size={24} color="#8A63FF" />
              Já tenho Login
          </Link>

        </section>

        <form onSubmit={handleRegister}>

          <input
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="voce@dominio.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            minLength="6"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmação de senha"
            minLength="6"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}