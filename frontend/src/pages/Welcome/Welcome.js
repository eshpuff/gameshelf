import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1>Bem-vindo ao GameShelf</h1>
                <p>Sua estante de jogos pessoal. Organize, avalie e descubra o que jogar a seguir.</p>
                <div className="welcome-actions">
                    <Link to="/auth" className="welcome-button primary">
                        Entrar
                    </Link>
                    <Link to="/auth" className="welcome-button secondary">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;