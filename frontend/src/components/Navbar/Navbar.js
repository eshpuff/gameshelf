import React from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/auth');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="navbar-brand">GameShelf</Link>
                <div className="navbar-links">
                    <NavLink 
                      to="/recommendations" 
                      className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
                    >
                        Recomendações
                    </NavLink>
                </div>
            </div>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
        </nav>
    );
};

export default Navbar;