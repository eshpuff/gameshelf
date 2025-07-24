import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import GameCard from '../../components/GameCard/GameCard';
import { FaPlus, FaMagic, FaSpinner, FaTrophy } from 'react-icons/fa';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const platinumedGames = games.filter(game => game.platinumed);

    useEffect(() => {
        if (!userId) {
            navigate('/auth');
            return;
        }

        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/games/${userId}`);
                setGames(response.data);
            } catch (error) {
                console.error('erro ao buscar os jogos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [userId, navigate]);

    const handleDeleteGame = async (gameId) => {
        setGames(prevGames => prevGames.filter(game => game.id !== gameId));
        try {
            await axios.delete(`http://127.0.0.1:5000/api/games/${gameId}`);
        } catch (error) {
            console.error('erro ao deletar o jogo:', error);
            alert('ué? parece não foi possível deletar o jogo... tente novamente mais tarde.');
        }
    };

    const handleSuggestGame = async () => {
        if (!userId) return;
        setIsSuggesting(true);

        try {
            const recommendationResponse = await axios.get(`http://127.0.0.1:5000/api/recommendations/random/${userId}`);
            const recommendedGame = recommendationResponse.data;

            const newGamePayload = {
                title: recommendedGame.title,
                genre: recommendedGame.genre,
                platform: recommendedGame.platform,
                rating: 0,
                playtime: 0,
                platinumed: false,
                user_id: userId
            };

            const addGameResponse = await axios.post('http://127.0.0.1:5000/api/games', newGamePayload);
            const addedGame = addGameResponse.data;
            setGames(prevGames => [...prevGames, addedGame]);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("parabéns! você já jogou todos os jogos da nossa lista!");
            } else {
                console.error('erro ao sugerir jogo:', error);
                alert('não foi possível obter uma sugestão. tente novamente mais tarde.');
            }
        } finally {
            setIsSuggesting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-900 text-white">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex items-center gap-3 text-xl">
                        <FaSpinner className="animate-spin" />
                        <span>carregando sua estante...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-white border-l-4 border-purple-500 pl-4">
                        minha estante
                    </h2>
                    <button
                        onClick={handleSuggestGame}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-700/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSuggesting}
                    >
                        {isSuggesting ? (
                            <><FaSpinner className="animate-spin" />sugerindo...</>
                        ) : (
                            <><FaMagic />o que jogar a seguir?</>
                        )}
                    </button>
                </div>

                {games.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} onDelete={handleDeleteGame} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                        <h3 className="text-xl font-semibold text-white mb-2">sua estante está vazia </h3>
                        <p className="text-slate-400 mb-6">que tal adicionar seu primeiro jogo para começar?</p>
                        <Link
                            to="/new-game"
                            className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
                        >
                            adicionar meu primeiro jogo
                        </Link>
                    </div>
                )}

                {platinumedGames.length > 0 && (
                    <div className="mt-16">
                        <h3 className='flex items-center gap-3 text-2xl font-bold text-white border-l-4 border-yellow-500 pl-4 mb-6'>
                            <FaTrophy className="text-yellow-400" />
                            jogos platinados
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                            {platinumedGames.map(game => (
                                <GameCard key={game.id} game={game} onDelete={handleDeleteGame} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Link
                to="/new-game"
                className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-purple-700 hover:scale-110 hover:rotate-90"
                title="adicionar novo jogo"
            >
                <FaPlus className="text-2xl" />
            </Link>
        </div>
    );
};

export default Dashboard;
