import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import GameCard from '../../components/GameCard/GameCard';
import './Dashboard.css';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [username, setUsername] = useState(''); // Vamos guardar o nome do usuário
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');

        if (!userId) {
            navigate('/auth'); // Se não estiver logado, vai para a página de login
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

    if (loading) {
        return <div className="loading-screen">Carregando sua estante...</div>;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <main className="dashboard-content">
                <h2>Minha Estante</h2>
                {games.length > 0 ? (
                    <div className="games-grid">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-shelf">
                        <p>Sua estante está vazia.</p>
                        <button className="add-game-button">Adicionar meu primeiro jogo</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;