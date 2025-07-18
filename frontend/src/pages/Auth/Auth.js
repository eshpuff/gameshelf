import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
    // estados do componente
    const [isLoginView, setIsLoginView] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/login', {
                email: loginEmail,
                password: loginPassword,
            });
            const { user_id } = response.data;
            localStorage.setItem('user_id', user_id);
            navigate('/dashboard');
        } catch (err) {
            setError('Email ou senha inválidos. Tente novamente.');
            console.error('Erro no login:', err);
        }
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // faz a chamada post para a api de cadastro no flash
            const response = await axios.post('http://127.0.0.1:5000/api/signup', {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            });

            // mostra a mensagem de sucesso e muda para a tela de login
            alert(response.data.message);
            setIsLoginView(true); // muda para a tela de login para o usuário entrar

        } catch (err) {
            setError('Não foi possível criar a conta. O email pode já estar em uso.');
            console.error('Erro no cadastro:', err.response ? err.response.data : err);
        }
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
                            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="login-password">Senha</label>
                            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="auth-button">Entrar</button>
                        <p className="toggle-view">Não tem uma conta? <span onClick={() => { setIsLoginView(false); setError(''); }}>Cadastre-se</span></p>
                    </form>
                ) : (
                    
                    // Formulário de Cadastro
                    <form onSubmit={handleSignup}>
                        <h2>Cadastro</h2>
                        {error && <p className="error-message">{error}</p>}
                        <div className="input-group">
                            <label htmlFor="signup-username">Nome de Usuário</label>
                            <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-email">Email</label>
                            <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-password">Senha</label>
                            <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="auth-button">Criar Conta</button>
                        <p className="toggle-view">Já tem uma conta? <span onClick={() => { setIsLoginView(true); setError(''); }}>Faça login</span></p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;