import React, { useState } from 'react';
import './Header.css';

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="App-header">
            <nav className="navbar">
                <div className="logo-container">
                    <img src="images/logo1.png" alt="Logo" className="logo1" />
                    <div className="separator"></div>
                    <img src="images/logo2.png" alt="Logo" className="logo2" />
                    <h1 className="title">Calendar</h1>
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <div className={`menu ${showMenu ? 'show' : ''}`}>
                <ul>
                    <li>Elemento 1</li>
                    <li>Elemento 2</li>
                    <li>Elemento 3</li>
                    <li>Elemento 4</li>
                    <li>Elemento 5</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;