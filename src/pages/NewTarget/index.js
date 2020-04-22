import React, { useState } from 'react';
import './styles.css';
import blackBoxImg from '../../assets/black_box.png';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../parts/header';

export default function Target() {


  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleNewtarget(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('targets', data, {
        headers: {
          Authorization: userId
        }
      });

      history.push('/profile');

    } catch (error) {
      alert('Erro ao cadastrar caso');
    }
  }

  return (
    <div className="new-target-container">

      <Header userName={userName} />

      <div className="content">

        <section className="form">

          <h1>Cadastrar novo objetivo</h1>
          <p>Descreva o objetivo que deseja cadastrar.</p>

          <form onSubmit={handleNewtarget}>

            <input
              placeholder="Nome do objetivo"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              placeholder="Valor em reais"
              value={value}
              onChange={e => setValue(e.target.value)}
              type="number"
            />

            <button className="button" type="submit">Cadastrar</button>

            <Link className="back-link" to="/profile">
              <MdKeyboardBackspace size={16} color="#8A63FF" />
              Voltar para Home
          </Link>

          </form>

        </section>

        <img src={blackBoxImg} alt="Money Box" />

      </div>
    </div>
  );
}