import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const EditGame = () => {
    const { gameId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [rating, setRating] = useState('');
    const [playtime, setPlaytime] = useState('');
    const [platinumed, setIsPlatinum] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const gameData = location.state?.game;
        if (gameData) {
            setTitle(gameData.title || '');
            setGenre(gameData.genre || '');
            setPlatform(gameData.platform || '');
            setRating(gameData.rating || '');
            setPlaytime(gameData.playtime || '');
            setIsPlatinum(gameData.platinumed || false);
        } else {
            console.error("Dados do jogo não encontrados no state da navegação.");
            setError("Dados do jogo não encontrados. Volte para o Dashboard.");
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const updatedGame = {
            title,
            genre,
            platform,
            rating: rating ? parseFloat(rating) : null,
            playtime: playtime ? parseInt(playtime, 10) : null,
            platinumed
        };

        try {
            await axios.put(`http://127.0.0.1:5000/api/games/${gameId}`, updatedGame);
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao atualizar o jogo:", err);
            setError("Não foi possível atualizar o jogo. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = "w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors";

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="flex justify-center items-center py-8 px-4">
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-2xl bg-slate-800 p-8 rounded-xl shadow-2xl shadow-black/20 border border-slate-700"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Editar Jogo
                    </h2>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Título</label>
                                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} required />
                            </div>
                            <div>
                                <label htmlFor="genre" className="block text-sm font-medium text-slate-300 mb-2">Gênero</label>
                                <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className={inputStyle} required />
                            </div>
                            <div>
                                <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">Plataforma</label>
                                <input type="text" id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputStyle} required />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-slate-300 mb-2">Nota (0 a 5)</label>
                                <input type="number" id="rating" step="0.5" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className={inputStyle} />
                            </div>
                            <div>
                                <label htmlFor="playtime" className="block text-sm font-medium text-slate-300 mb-2">Tempo de Jogo (horas)</label>
                                <input type="number" id="playtime" min="0" value={playtime} onChange={(e) => setPlaytime(e.target.value)} className={inputStyle} />
                            </div>
                            <div className="flex items-center pt-2">
                                <input
                                    type="checkbox"
                                    id="isPlatinum"
                                    checked={platinumed}
                                    onChange={(e) => setIsPlatinum(e.target.checked)}
                                    className="h-5 w-5 bg-slate-700 border-slate-600 rounded text-purple-500 focus:ring-purple-500"
                                />
                                <label htmlFor="isPlatinum" className="ml-3 text-sm font-medium text-slate-300">Platinado / 100% Completo?</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
                        <button 
                            type="button" 
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2 rounded-lg text-white bg-slate-600 hover:bg-slate-500 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="px-6 py-2 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGame;
