import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import axios from 'axios'; // Importe o axios
import './Auth.css';

const Auth = () => {
    // Estado para controlar qual formulário é exibido
    const [isLoginView, setIsLoginView] = useState(true);

    // Hooks para o formulário de login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Hooks para o formulário de cadastro (faremos a lógica depois)
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const [error, setError] = useState(''); // Estado para guardar mensagens de erro

    const navigate = useNavigate(); // Hook para navegar entre as páginas

    // Função para lidar com o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        setError(''); // Limpa erros anteriores

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/login', {
                email: loginEmail,
                password: loginPassword,
            });

            // Se o login for bem-sucedido
            const { user_id } = response.data;
            localStorage.setItem('user_id', user_id); // Guarda o user_id no navegador
            navigate('/dashboard'); // Redireciona para o dashboard

        } catch (err) {
            // Se houver um erro (ex: credenciais inválidas)
            setError('Email ou senha inválidos. Tente novamente.');
            console.error('Erro no login:', err);
        }
    };

    // Função para o cadastro (vamos implementar depois)
    const handleSignup = (e) => {
        e.preventDefault();
        alert('Funcionalidade de cadastro a ser implementada!');
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                {isLoginView ? (
                    // Formulário de Login
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <div className="input-group">
                            <label htmlFor="login-email">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="login-password">Senha</label>
                            <input
                                type="password"
                                id="login-password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-button">Entrar</button>
                        <p className="toggle-view">
                            Não tem uma conta? <span onClick={() => { setIsLoginView(false); setError(''); }}>Cadastre-se</span>
                        </p>
                    </form>
                ) : (
                    // Formulário de Cadastro
                    <form onSubmit={handleSignup}>
                        <h2>Cadastro</h2>

                        <div className="input-group">
                            <label htmlFor="signup-email">Email</label>
                            <input type="email" id="signup-email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-password">Senha</label>
                            <input type="password" id="signup-password" required />
                        </div>
                        <button type="submit" className="auth-button">Criar Conta</button>
                        <p className="toggle-view">
                            Já tem uma conta? <span onClick={() => { setIsLoginView(true); setError(''); }}>Faça login</span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;