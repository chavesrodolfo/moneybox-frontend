import React, { useEffect, useState } from 'react';
import './styles.css';
import blackBoxImg from '../../assets/black_box.png';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import Header from '../parts/header';

export default function Target(props) {


  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const isEditing = props.match.params.id !== 'new';

  const { id } = useParams();

  useEffect(() => {
    if (isEditing) {
      const { target } = props.location.state.targetInEdition;
      setTitle(target.title);
      setDescription(target.description);
      setValue(target.value);
      setCurrentValue(target.currentValue);
    }

  }, [id, isEditing, props]);

  function handleTarget(e) {
    e.preventDefault();

    let data = {
      title,
      description,
      value,
      currentValue
    };

    if (isEditing) {
      updateTarget(id, data);
    } else {
      addNewTarget(data);
    }

  }

  async function addNewTarget(data) {

    try {
      await api.post('targets', data, {
        headers: {
          Authorization: userId
        }
      });

      history.push('/profile');

    } catch (error) {
      alert('Erro ao cadastrar objetivo');
    }
  }

  async function updateTarget(id, data) {

    try {
      await api.put(`targets/${id}`, data, {
        headers: {
          Authorization: userId
        }
      });

      history.push('/profile');

    } catch (error) {
      alert('Erro ao editar objetivo');
    }
  }

  return (
    <div className="target-container">

      <Header userName={userName} />

      <div className="content">

        <section className="form">

          <h1>Cadastrar novo objetivo</h1>
          <p>Descreva o objetivo que deseja cadastrar.</p>

          <form onSubmit={handleTarget}>

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
              placeholder="Valor desejado"
              value={value}
              onChange={e => setValue(e.target.value)}
              type="number"
            />
            <input
              placeholder="Valor atual"
              value={currentValue}
              onChange={e => setCurrentValue(e.target.value)}
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