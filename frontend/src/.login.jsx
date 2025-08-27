// src/pages/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './loginpage.css';
import logo from '../../assets/Incognidex.png';

function LoginPage() {
  // 4. Adicionar estado para controlar os inputs do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  // 5. Efeito para gerenciar a classe do body e o título da página
    useEffect(() => {
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add('form-page');
    document.title = 'Login - Incognidex';

    // Remove a classe quando o componente é desmontado (limpeza)
    return () => {
        document.body.classList.remove('form-page');
    };
  }, []); // O array vazio [] faz com que este efeito rode apenas uma vez

    const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    // Aqui virá a lógica para enviar os dados para o backend
    console.log({ email, password });
    };

    return (
    <>
        <div className="background-container">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        </div>

        <main className="form-container">
        <div className="logo-container">
          {/* 6. Usar o componente Link para a navegação */}
            <Link to="/" title="Voltar para a página inicial">
            <img src={logo} alt="Logo Incognidex" />
            </Link>
        </div>
        <h1>Bem-vindo de volta!</h1>
        <p>Pronto para desvendar o desconhecido?</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            {/* 7. Alterar 'for' para 'htmlFor' e controlar o input */}
            <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
            <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
        <div className="links-footer">
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
        </div>
        </main>
    </>
    );
}

export default LoginPage;