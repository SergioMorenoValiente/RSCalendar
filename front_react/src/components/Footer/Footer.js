import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    //Función para realizar el desplazamiento suave
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="footer">

            {/* Ocultado Primer Div para la Segunda Entrega*/}
            {/* Sección de enlaces
            <div className="footer-section">
                <div className="footer-div">
                    <p><Link to="/SobreNosotros" onClick={scrollToTop}>
                        SOBRE NOSOTROS
                    </Link> | <Link to="/DeclaracionDeAccesibilidad" onClick={scrollToTop}>
                            DECLARACION DE ACCESIBILIDAD
                        </Link></p>
                </div>
            </div>*/}

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

            {/* Sección de información de derechos de autor y enlace página Sobre Nosotros*/}
            <div className="footer-section">
                <div className="footer-div">
                    <p><Link to="/SobreNosotros" onClick={scrollToTop}>
                        SOBRE NOSOTROS
                    </Link> - LEAGUE OF LEGENDS® | RS CALENDAR - 2024</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;