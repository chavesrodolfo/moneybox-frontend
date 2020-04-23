import React, { useEffect, useState } from 'react';
import './styles.css';
import manBoxEmpty from '../../assets/man_box_empty.png'
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import api from '../../services/api';
import { Fab } from '@material-ui/core';
import Header from '../parts/header';

export default function Profile() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const [targets, setTargets] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId
            }
        }).then(response => {
            setTargets(response.data)
        })
    }, [userId]);

    async function handleDeleteTarget(id) {
        try {
            await api.delete(`targets/${id}`, {
                headers: {
                    Authorization: userId
                }
            });

            setTargets(targets.filter(target => target.id !== id));

        } catch (err) {
            alert('Erro ao remover caso.')
        }
    }

    function ShowEmpty(props) {
        if (props.condition) {
            return (
                <div>
                    <div>Você não possui objetivos cadastrados.</div>
                    <img style={{ paddingTop: "30px" }} src={manBoxEmpty} alt="Caixa de objetivos vazia" />
                </div>
            );
        }
        return null;
    }

    return (
        <div className="profile-container">
            
            <Header userName={userName}/>

            <h1>
                Meus objetivos
                <Fab href="/targets/new" className="fab-add" color="primary" aria-label="add">
                    <MdAdd />
                </Fab>
            </h1>

            <ul>
                {targets.map(target => (
                    <li key={target.id}>
                        <strong>Objetivo</strong>
                        <p>{target.title}</p>

                        <strong>Descrição</strong>
                        <p>{target.description}</p>

                        <strong>Valor desejado</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(target.value)}</p>

                        <strong>Valor atual</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(target.currentValue)}</p>

                        <button type="button" onClick={() => handleDeleteTarget(target.id)}>
                            <FiTrash2 size={24} color="#8A63FF" />
                        </button>
                    </li>
                ))}
            </ul>

            <ShowEmpty condition={targets.length === 0} >
            </ShowEmpty>

        </div>
    );
}