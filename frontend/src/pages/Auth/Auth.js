import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Auth = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/signup', {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            });
            setSuccessMessage(response.data.message + ' Você já pode fazer o login.');
            setTimeout(() => {
                setIsLoginView(true);
                setSignupUsername('');
                setSignupEmail('');
                setSignupPassword('');
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            setError('Não foi possível criar a conta. O email pode já estar em uso.');
            console.error('Erro no cadastro:', err.response ? err.response.data : err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setSuccessMessage('');
    };

    const inputStyle = "w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors";

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900 p-4">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 -z-10"></div>
            <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl shadow-black/30 border border-slate-700">
                <form onSubmit={isLoginView ? handleLogin : handleSignup}>
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        {isLoginView ? 'Login' : 'Crie sua Conta'}
                    </h2>

                    {error && <p className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">{error}</p>}
                    {successMessage && <p className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6 text-center">{successMessage}</p>}

                    <div className="space-y-4">
                        {!isLoginView && (
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Nome de Usuário" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} className={inputStyle} required />
                            </div>
                        )}
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="email" placeholder="Email" value={isLoginView ? loginEmail : signupEmail} onChange={(e) => isLoginView ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)} className={inputStyle} required />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" placeholder="Senha" value={isLoginView ? loginPassword : signupPassword} onChange={(e) => isLoginView ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)} className={inputStyle} required />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full mt-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-wait">
                        {isSubmitting ? 'Processando...' : (isLoginView ? 'Entrar' : 'Criar Conta')}
                    </button>

                    <p className="text-center mt-6 text-sm text-slate-400">
                        {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button type="button" onClick={toggleView} className="font-semibold text-purple-400 hover:underline ml-2">
                            {isLoginView ? 'Cadastre-se' : 'Faça login'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Auth;
