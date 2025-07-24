import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';

const Welcome = () => {
    const animationStyle = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-welcome-1 { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-welcome-2 { opacity: 0; animation: fadeInUp 0.6s ease-out 0.2s forwards; }
        .animate-welcome-game { display: inline-block; opacity: 0; animation: fadeInUp 0.5s ease-out 0.4s forwards; }
        .animate-welcome-shelf { display: inline-block; opacity: 0; animation: fadeInUp 0.5s ease-out 0.6s forwards; }
        .animate-welcome-3 { opacity: 0; animation: fadeInUp 0.6s ease-out 0.8s forwards; }
        .animate-welcome-4 { opacity: 0; animation: fadeInUp 0.6s ease-out 1.0s forwards; }
        .animate-welcome-5 { opacity: 0; animation: fadeIn 1s ease-out 1.3s forwards; }
    `;

    return (
        <>
            <style>{animationStyle}</style>
            <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 text-center text-white p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 -z-10"></div>
                
                <div className="max-w-2xl">
                    <div className="animate-welcome-1">
                        <FaGamepad className="text-6xl text-purple-400 mx-auto mb-6" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                        <span className="animate-welcome-2">bem-vindo ao </span>
                        <span className="inline-block">
                            <span className="animate-welcome-game">game</span>
                            <span className="text-purple-400 animate-welcome-shelf">shelf</span>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 animate-welcome-3">
                        sua estante de jogos pessoal. organize, avalie e descubra o que jogar a seguir.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-welcome-4">
                        <Link 
                            to="/auth" 
                            className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 hover:scale-105"
                        >
                            entrar ou criar conta
                        </Link>
                    </div>
                </div>
                
                <footer className="absolute bottom-4 text-sm text-slate-500 animate-welcome-5">
                    <p>criado para organizar sua jogatina.</p>
                    <p>por: <span className="font-semibold text-purple-400">eshpuff</span></p>
                </footer>
            </div>
        </>
    );
};

export default Welcome;
