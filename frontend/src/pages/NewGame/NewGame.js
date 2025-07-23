import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

const NewGame = () => {
    // Nomes dos estados corrigidos para consistência
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [rating, setRating] = useState('');
    const [playtime, setPlaytime] = useState(''); // CORRIGIDO de 'time'
    const [platinumed, setPlatinumed] = useState(false); // CORRIGIDO de 'isPlatinum'
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setError("Você precisa estar logado para adicionar um jogo.");
            setIsSubmitting(false);
            return;
        }

        // Payload corrigido para enviar os nomes corretos para a API
        const newGame = {
            title,
            genre,
            platform,
            rating: rating ? parseFloat(rating) : null,
            playtime: playtime ? parseInt(playtime, 10) : null, // CORRIGIDO
            platinumed, // CORRIGIDO
            user_id: parseInt(userId, 10)
        };

        try {
            await axios.post('http://127.0.0.1:5000/api/games', newGame);
            navigate('/dashboard'); // Redireciona para o dashboard em caso de sucesso
        } catch (err) {
            console.error("Erro ao adicionar o jogo:", err);
            setError("Não foi possível adicionar o jogo. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Estilos de input reutilizáveis
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
                        Adicionar Novo Jogo
                    </h2>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Coluna da Esquerda */}
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

                        {/* Coluna da Direita */}
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
                                    id="platinumed"
                                    checked={platinumed}
                                    onChange={(e) => setPlatinumed(e.target.checked)}
                                    className="h-5 w-5 bg-slate-700 border-slate-600 rounded text-purple-500 focus:ring-purple-500"
                                />
                                <label htmlFor="platinumed" className="ml-3 text-sm font-medium text-slate-300">Platinado / 100% Completo?</label>
                            </div>
                        </div>
                    </div>

                    {/* Botões de Ação */}
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
                            {isSubmitting ? 'Adicionando...' : 'Adicionar Jogo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewGame;
