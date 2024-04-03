import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">

            {/* Sección de enlaces */}
            <div className="footer-section">
                <div className="footer-div">
                    <p><Link to="/SobreNosotros">
                        SOBRE NOSOTROS
                    </Link> | <Link to="/DeclaracionDeAccesibilidad">
                            DECLARACION DE ACCESIBILIDAD
                        </Link></p>
                </div>
            </div>

            {/* Sección de logos */}
            <div className="footer-section">
                <div className="footer-div">
                    <img src="images/Logos/logo5.png" alt="Logo de League of Legends"
                        className="logo3" />
                </div>
                <div className="footer-div">
                    <img src="images/Logos/logo3.png" alt="Logo de Riot Games" />
                </div>
                <div className="footer-div">
                    <img src="images/Logos/logo4.png" alt="Logo de la Calificación" />
                </div>
            </div>

            {/* Sección de información de derechos de autor */}
            <div className="footer-section">
                <div className="footer-div">
                    <p>LEAGUE OF LEGENDS® | RS CALENDAR - 2024</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;