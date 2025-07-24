import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaRegStar, FaTrophy, FaClock, FaTrash, FaEdit } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-gray-500" />);
        }
    }
    return <div className="flex items-center gap-1">{stars}</div>;
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
                console.error('não foi possível buscar imagem para:', game.title, error);
                setImageUrl('/ops.png');
            } finally {
                setLoading(false);
            }
        };
        fetchImage();
    }, [game]);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm(`tem certeza que deseja excluir "${game.title}"?`)) {
            onDelete(game.id);
        }
    };

    if (loading) {
        return <div className="aspect-[9/16] bg-slate-800 rounded-xl animate-pulse"></div>;
    }

    const { id, title, genre, platform, rating = 0, playtime, platinumed } = game;

    return (
        <div className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

            <div className="relative flex flex-col justify-end h-full p-4 text-white">
                <h3 className="text-lg font-bold leading-tight drop-shadow-md transition-transform duration-300 transform group-hover:-translate-y-1">
                    {title}
                </h3>
                
                <div className="pt-1 transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96">
                    <div className="flex items-center mb-2">
                        <StarRating rating={rating} />
                    </div>

                    <div className="flex flex-col items-start gap-1 text-sm text-gray-300 mb-3">
                        {playtime > 0 && (
                            <div className="flex items-center gap-2">
                                <FaClock />
                                <span>{playtime} horas</span>
                            </div>
                        )}
                        {platinumed && (
                            <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                                <FaTrophy />
                                <span>platinado!</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {platform && <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{platform}</span>}
                        {genre && <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{genre}</span>}
                    </div>
                </div>
            </div>

            <div className="absolute top-3 left-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                    to={`/edit-game/${id}`}
                    state={{ game: game }}
                    className="flex items-center justify-center w-9 h-9 bg-blue-500/80 hover:bg-blue-500 rounded-full transition-colors"
                    title="editar jogo"
                >
                    <FaEdit />
                </Link>
                <button
                    onClick={handleDeleteClick}
                    className="flex items-center justify-center w-9 h-9 bg-red-600/80 hover:bg-red-600 rounded-full transition-colors"
                    title="excluir jogo"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default GameCard;
