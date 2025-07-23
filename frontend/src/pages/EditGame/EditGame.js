import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import '../NewGame/NewGame.css';

const EditGame = () => {
    const { gameId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // 0estados do formulário
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');
    const [isPlatinum, setIsPlatinum] = useState(false);
    const [error, setError] = useState('');

    // preenche o form quando o componente carrega
    useEffect(() => {
        const gameData = location.state?.game;
        if (gameData) {
            setTitle(gameData.title);
            setGenre(gameData.genre);
            setPlatform(gameData.platform);
            setRating(gameData.rating || '');
            setTime(gameData.playtime || '');
            setIsPlatinum(gameData.platinumed || false);
        } else {
            setError("Dados do jogo não encontrados. Volte para o Dashboard.");
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const updatedGame = {
            title,
            genre,
            platform,
            rating: rating ? parseFloat(rating) : null,
            time: time ? parseInt(time, 10) : null,
            isPlatinum
        };

        try {
            await axios.put(`http://127.0.0.1:5000/api/games/${gameId}`, updatedGame);
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Erro ao atualizar o jogo:", err);
            setError("Não foi possível atualizar o jogo.");
        }
    };

    return (
        <div className="add-game-container">
            <Navbar />
            <div className="add-game-content">
                <form className="add-game-form" onSubmit={handleSubmit}>
                    <h2>Editar Jogo</h2>
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="input-group">
                        <label htmlFor="title">Título</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="genre">Gênero</label>
                        <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="platform">Plataforma</label>
                        <input type="text" id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rating">Nota (0 a 5)</label>
                        <input type="number" id="rating" step="0.5" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="time">Tempo de Jogo (em horas)</label>
                        <input type="number" id="time" min="0" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="isPlatinum" checked={isPlatinum} onChange={(e) => setIsPlatinum(e.target.checked)} />
                        <label htmlFor="isPlatinum">Platinado?</label>
                    </div>
                    <div className="form-actions">
                         <button type="button" className="cancel-button" onClick={() => navigate('/dashboard')}>Cancelar</button>
                         <button type="submit" className="submit-button">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGame;