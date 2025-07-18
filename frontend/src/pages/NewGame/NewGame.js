import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; 
import './NewGame.css';
import axios from 'axios';

const NewGame = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');
    const [isPlatinum, setIsPlatinum] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setError("Você precisa estar logado para adicionar um jogo.");
            return;
        }

        const newGame = {
            title,
            genre,
            platform,
            // converte para num ou envia null se estiver vazio
            rating: rating ? parseFloat(rating) : null,
            time: time ? parseInt(time, 10) : null,
            isPlatinum,
            user_id: parseInt(userId, 10)
        };

        try {
            await axios.post('http://127.0.0.1:5000/api/games', newGame);
            // se der certo, volta para o dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error("Erro ao adicionar o jogo:", error);
            setError("Não foi possível adicionar o jogo. Tente novamente.");
        }
    };

    return (
        <div className="add-game-container">
            <Navbar />
            <div className="add-game-content">
                <form className="add-game-form" onSubmit={handleSubmit}>
                    <h2>Adicionar Novo Jogo</h2>
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="input-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="genre">Gênero</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="platform">Plataforma</label>
                        <input
                            type="text"
                            id="platform"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rating">Nota (0 a 5)</label>
                        <input
                            type="number"
                            id="rating"
                            step="0.5"
                            min="0"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="time">Tempo de Jogo (em horas)</label>
                        <input
                            type="number"
                            id="time"
                            min="0"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="isPlatinum"
                            checked={isPlatinum}
                            onChange={(e) => setIsPlatinum(e.target.checked)}
                        />
                        <label htmlFor="isPlatinum">Platinado?</label>
                    </div>
                    <div className="form-actions">
                         <button type="button" className="cancel-button" onClick={() => navigate('/dashboard')}>Cancelar</button>
                         <button type="submit" className="submit-button">Adicionar Jogo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewGame;