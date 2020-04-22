import React from 'react';
import './styles.css';
import logoImg from '../../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

export default function Header() {
    const userName = localStorage.getItem('userName');
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    };

    return (
        <header>
            <img src={logoImg} alt="Money Box" />
            <span>Olá {userName}!</span>

            <button type="button" onClick={handleLogout}>
                <FiPower size="28" color="#8A63FF" />
            </button>
        </header>
    );
}