import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { FaPlus, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);
    const [feedback, setFeedback] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            navigate('/auth');
            return;
        }

        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/recommendations');
                setRecommendations(response.data);
            } catch (error) {
                console.error("erro ao buscar recomendações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [navigate]);

    const handleAddGame = async (game) => {
        const userId = localStorage.getItem('user_id');
        setAddingId(game.id);
        setFeedback({});

        const newGame = {
            title: game.title,
            genre: game.genre,
            platform: game.platform,
            user_id: parseInt(userId, 10),
            rating: 0,
            playtime: 0,
            platinumed: false
        };

        try {
            await axios.post('http://127.0.0.1:5000/api/games', newGame);
            setFeedback({ type: 'success', message: `"${game.title}" adicionado!`, id: game.id });
            setRecommendations(prev => prev.filter(r => r.id !== game.id));
        } catch (error) {
            console.error("erro ao adicionar jogo da recomendação:", error);
            const errorMessage = error.response?.data?.error || "parece que você ja jogou esse jogo antes!";
            setFeedback({ type: 'error', message: errorMessage, id: game.id });
        } finally {
            setAddingId(null);
            setTimeout(() => setFeedback({}), 3000);
        }
    };

    if (loading) {
        return (
             <div className="flex flex-col min-h-screen bg-slate-900 text-white">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex items-center gap-3 text-xl">
                        <FaSpinner className="animate-spin" />
                        <span>carregando Recomendações...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white border-l-4 border-purple-500 pl-4">
                        jogos recomendados
                    </h2>
                    <p className="text-slate-400 mt-2 pl-4">
                        aqui estão algumas sugestões do gameshelf para você explorar!
                    </p>
                </div>

                {recommendations.length > 0 ? (
                    <div className="space-y-4">
                        {recommendations.map(game => (
                            <div key={game.id} className="bg-slate-800/70 p-4 rounded-lg flex items-center justify-between transition-all duration-300 border border-transparent hover:border-purple-500/50">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{game.title}</h3>
                                    <p className="text-slate-400 text-sm">{game.genre} • {game.platform}</p>
                                    {feedback.id === game.id && (
                                        <div className={`flex items-center gap-2 mt-2 text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                            {feedback.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                                            <span>{feedback.message}</span>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleAddGame(game)}
                                    disabled={addingId === game.id}
                                    className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full transition-all duration-300 hover:bg-purple-700 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Adicionar à Estante"
                                >
                                    {addingId === game.id ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16 px-6 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                        <h3 className="text-xl font-semibold text-white mb-2">Tudo Certo!</h3>
                        <p className="text-slate-400">Você já adicionou todas as recomendações disponíveis. Volte mais tarde!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecommendationsPage;
