import React, { useState, useEffect, use } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './GameCard.css';

const GameCard = ({ game }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            if (!game.title) return;

            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/search-game-image/${game.title}`);
                setImageUrl(response.data.image_url);
            } catch (error) {
                console.error('Não foi possivel buscar imagem de:', game.title,);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [game.title]);

    if (loading) {
        return <div className="game-card loading">Carregando...</div>;
    }

    return (
        <div className="game-card" style= {{ backgroundImage: `url(${imageUrl})` }}>
            <div className="game-card-overlay">
                <h3 className="game-card-title">{game.title}</h3>
                <Link to={`/edit-game/${game.id}`} state={{ game: game}} className="edit-game-button"> Editar </Link>
            </div>
        </div>
    );
};

export default GameCard;