import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './GameCard.css';
import { FaStar, FaRegStar, FaTrophy, FaClock , FaTrash } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }
    return <div className="star-rating">{stars}</div>;
};


const GameCard = ({ game, onDelete }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            if (!game || !game.title) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/search-game-image/${encodeURIComponent(game.title)}`);
                if (response.data && response.data.image_url) {
                    setImageUrl(response.data.image_url);
                }
            } catch (error) {
                console.error('Não foi possível buscar imagem para:', game.title, error);
                // setImageUrl('/path/to/default-image.jpg');
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [game]); 

    const handleDeleteClick = (e) => {
        e.preventDefault();
        if (window.confirm(`Tem certeza que deseja excluir "${game.title}"?`)) {
            onDelete(game.id);
        }
    };

    if (loading) {
        return <div className="game-card loading"></div>;
    }

    const { id, title, genre, platform, rating = 0, playtime, platinumed } = game;

    return (
        <div className="game-card" style={{ backgroundImage: `url(${imageUrl})` }}>
            
            {platinumed && <FaTrophy className="platinum-trophy" title="Platinado!" />}
            
            <Link to={`/edit-game/${id}`} state={{ game: game }} className="edit-button">
                Editar
            </Link>

            <button onClick={handleDeleteClick} className="delete-button" title="Excluir jogo">
                <FaTrash />
            </button>

            <div className="game-card-overlay">
                <h3 className="game-card-title">{title}</h3>
                
                <div className="game-card-details">
                    <div className="game-info">
                        <StarRating rating={rating} />
                    </div>
                    
                    {playtime && (
                        <div className="game-info">
                            <FaClock className="icon" />
                            <span>{playtime} horas</span>
                        </div>
                    )}
                    
                    <div className="tags">
                        {platform && <span className="tag">{platform}</span>}
                        {genre && <span className="tag">{genre}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;