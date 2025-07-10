import React from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1 className='navbar-brand'>GameShelf</h1>
            <button className="navbar-button" onClick={handleLogout}>Sair </button>
        </nav>
    );
};

export default Navbar;