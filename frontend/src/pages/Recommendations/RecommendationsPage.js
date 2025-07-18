import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './RecommendationsPage.css';

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user_id')) {
            navigate('/auth');
            return;
        }

        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/recommendations');
                setRecommendations(response.data);
            } catch (error) {
                console.error("Erro ao buscar recomendações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [navigate]);

    const handleAddGame = async (game) => {
        const userId = localStorage.getItem('user_id');
        const newGame = {
            title: game.title,
            genre: game.genre,
            platform: game.platform,
            user_id: parseInt(userId, 10)
        };

        try {
            await axios.post('http://127.0.0.1:5000/api/games', newGame);
            alert(`'${game.title}' foi adicionado à sua estante!`);
        } catch (error) {
            console.error("Erro ao adicionar jogo da recomendação:", error);
            alert("Não foi possível adicionar o jogo. Você já pode tê-lo na estante.");
        }
    };

    if (loading) {
        return <div className="loading-screen">Carregando Recomendações...</div>;
    }

    return (
        <div className="recommendations-container">
            <Navbar />
            <main className="recommendations-content">
                <h2>Jogos Recomendados</h2>
                <p className="recommendations-subtitle">Adicione novos títulos à sua estante com um clique.</p>
                <div className="recommendations-grid">
                    {recommendations.map(game => (
                        <div key={game.id} className="recommendation-card">
                            <div className="card-info">
                                <h3>{game.title}</h3>
                                <p>{game.genre} • {game.platform}</p>
                            </div>
                            <button onClick={() => handleAddGame(game)} className="add-button">+</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default RecommendationsPage;