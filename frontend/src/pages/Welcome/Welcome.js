import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';

const Welcome = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 text-center text-white p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 -z-10"></div>
            
            <div className="max-w-2xl">
                <FaGamepad className="text-6xl text-purple-400 mx-auto mb-6" />

                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    Bem-vindo ao <span className="text-purple-400">GameShelf</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10">
                    Sua estante de jogos pessoal. Organize, avalie e descubra o que jogar a seguir.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link 
                        to="/auth" 
                        className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 hover:scale-105"
                    >
                        Entrar ou Criar Conta
                    </Link>
                </div>
            </div>
            
            <footer className="absolute bottom-4 text-sm text-slate-500">
                <p>Criado para organizar sua jogatina.</p>
            </footer>
        </div>
    );
};

export default Welcome;
