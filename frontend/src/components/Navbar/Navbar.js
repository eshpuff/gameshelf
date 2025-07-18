import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link,useNavbar } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="navbar-brand">GameShelf</Link>
                <div className="navbar-links">
                    <Link to="/recommendations" className="navbar-link">Recomendações</Link>
                </div>
            </div>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
        </nav>
    );
};

export default Navbar;