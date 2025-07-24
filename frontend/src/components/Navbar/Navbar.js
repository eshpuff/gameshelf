import React from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/');
    };

    const getNavLinkClass = ({ isActive }) => {
        const baseClasses = "font-semibold pb-1 border-b-2 transition-colors duration-300";
        if (isActive) {
            return `${baseClasses} text-purple-400 border-purple-400`;
        }
        return `${baseClasses} text-gray-400 border-transparent hover:text-white hover:border-white/50`;
    };

    const animationStyle = `
        @keyframes fadeInFromTop {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-game-in {
            display: inline-block;
            animation: fadeInFromTop 0.15s ease-out forwards;
        }

        .animate-shelf-in {
            display: inline-block;
            opacity: 0; /* Começa invisível */
            animation: fadeInFromTop 0.20s ease-out 0.7s forwards;
        }
    `;

    return (
        <>
            <style>{animationStyle}</style>
            <nav className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/dashboard" className="group text-2xl font-bold">
                                <span className="text-white transition-colors duration-300 group-hover:text-purple-400 animate-game-in">game</span>
                                <span className="text-purple-500 animate-shelf-in">shelf</span>
                            </Link>
                            <div className="hidden md:flex items-baseline space-x-6">
                                <NavLink to="/recommendations" className={getNavLinkClass}>
                                    recomendações
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-600/50 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/30"
                                title="Sair da conta"
                            >
                                <FaSignOutAlt />
                                <span className="hidden sm:inline">sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
