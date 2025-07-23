import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import GameCard from '../../components/GameCard/GameCard';
import './Dashboard.css';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    useEffect(() => {

        if (!userId) {
            navigate('/auth'); 
            return;
        }

        const fetchGames = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/games/${userId}`);
                setGames(response.data);
            } catch (error) {
                console.error('Erro ao buscar os jogos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [navigate]);

    const handleDeleteGame = async (gameId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/games/${gameId}`);
            setGames(prevGames => prevGames.filter(game => game.id !== gameId));
        } catch (error) {
            console.error('Erro ao deletar o jogo:', error);
            alert('Não foi possível deletar o jogo. Tente novamente.');
        }
    };

    const handleSuggestGame = async () => {
        if (!userId) return;
        setIsSuggesting(true);

        try {
            // pega uma recomendação aleatoria
            const recommendationResponse = await axios.get(`http://127.0.0.1:5000/api/recommendations/random/${userId}`);
            const recommendedGame = recommendationResponse.data;

            // prepara os dados para adicionar à estante
            const newGamePayload = {
                title: recommendedGame.title,
                genre: recommendedGame.genre,
                platform: recommendedGame.platform,
                rating: 0,
                time: 0,
                isPlatinum: false,
                user_id: userId
            };

            // adiciona o jogo na estante
            const addGameResponse = await axios.post('http://127.0.0.1:5000/api/games', newGamePayload);
            const addedGame = addGameResponse.data;
            setGames(prevGames => [...prevGames, addedGame]);
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Parabéns! Parece que não há mais jogos novos para sugerir.");
            } else {
                console.error('Erro ao sugerir jogo:', error);
                alert('Não foi possível obter uma sugestão. Tente novamente.');
            }
        } finally {
            setIsSuggesting(false);
        }
    }

    if (loading) {
        return <div className="loading-screen">Carregando sua estante...</div>;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <main className="dashboard-content">
                <h2>Minha Estante</h2>
                <button 
                        onClick={handleSuggestGame} 
                        className="suggest-game-button"
                        disabled={isSuggesting}
                    >
                        {isSuggesting ? 'Sugerindo...' : '✨ Sugerir Jogo Aleatório'}
                    </button>

                {games.length > 0 ? (
                    <div className="games-grid">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} onDelete={handleDeleteGame}/>

                        ))}
                    </div>
                ) : (
                    <div className="empty-shelf">
                        <p>Sua estante está vazia.</p>
                        <Link to="/new-game" className='add-game-button'>Adicionar meu primeiro jogo</Link>
                    </div>
                )}
            </main>
            <Link to="/new-game" className="add-game-fab">
            +
            </Link>
        </div>
    );

};

export default Dashboard;