import React from 'react';
import { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Tooltip from './Tooltip';
import { removeStoredUserId, removeStoredUserJwt } from '../Utils';

function Header({ setIsSidebarOpen, isSidebarOpen, onLogout }) {

    //Obtiene la ubicación actual
    const location = useLocation();

    //Verifica si la página actual es la página de inicio
    const isHomePage = location.pathname === '/';

    //MENÚ DESPLEGABLE DEL PERFIL
    //Estado para gestionar la apertura y cierre del menú de perfil
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    //Función para alternar el menú de perfil
    const toggleProfileMenu = () => {
        setIsSidebarOpen(false);
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    //TOOLTIPS
    //Estados para mostrar u ocultar los tooltips
    const [showSidebarTooltip, setShowSidebarTooltip] = useState(false);
    const [showProfileTooltip, setShowProfileTooltip] = useState(false);
    const [showAjustesTooltip, setShowAjustesTooltip] = useState(false);
    const [showCalendarTooltip, setShowCalendarTooltip] = useState(false);
    const [showTareasTooltip, setShowTareasTooltip] = useState(false);
    const [showNovedadTooltip, setShowNovedadTooltip] = useState(false);

    //BARRA LATERAL
    //Función para alternar la barra lateral
    const handleToggleSidebar = () => {
        setIsProfileMenuOpen(false);
        setIsSidebarOpen(prevState => !prevState);
    };

    //Cerrar sesion
    const handleLogout = () => {
        removeStoredUserId();
        removeStoredUserJwt();
        window.location.reload();
    };

    return (
        <header className="App-header">
            <nav className="navbar">
                <div className="logo-container">

                    {/* Logo de League of Legends */}
                    <img src="images/Logos/logo1.png" alt="Logo de League of Legends"
                        className="logo1" />
                    <div className="separator"></div>

                    {/* Logo de RS CALENDAR y enlace al inicio */}
                    <Link to="/" className="nav-link1">
                        <img src="images/Logos/logo6.png" alt="Logo de RS Calendar"
                            className="logo2" />
                    </Link>

                </div>
                <div className="nav-links">

                    {/* Icono de la barra lateral */}
                    {isHomePage && <div className="icon-container"
                        onMouseEnter={() => setShowSidebarTooltip(true)}
                        onMouseLeave={() => setShowSidebarTooltip(false)}>
                        <img src="images/Iconos/Icono8.png"
                            className="icono3"
                            onClick={handleToggleSidebar} />
                        {showSidebarTooltip && <Tooltip text="Menú" />}
                    </div>}

                    {/* Enlace a la página de calendario */}
                    {location.pathname !== '/' && (
                        <Link to="/" className="nav-link tooltip1"
                            onMouseEnter={() => setShowCalendarTooltip(true)}
                            onMouseLeave={() => setShowCalendarTooltip(false)}>
                            <img src="images/Iconos/Icono20.png" className="icono5" />
                            {showCalendarTooltip && <Tooltip text="Calendario" />}
                        </Link>
                    )}

                    {/* Enlace a la página de tareas */}
                    {location.pathname !== '/Tareas' && (
                        <Link to="/Tareas" className="nav-link tooltip1"
                            onMouseEnter={() => setShowTareasTooltip(true)}
                            onMouseLeave={() => setShowTareasTooltip(false)}>
                            <img src="images/Iconos/Icono16.png" className="icono4" />
                            {showTareasTooltip && <Tooltip text="Tareas" />}
                        </Link>
                    )}

                    {/* Enlace a la página de novedades
                    <Link to="/Novedades" className="nav-link tooltip1"
                        onMouseEnter={() => setShowNovedadTooltip(true)}
                        onMouseLeave={() => setShowNovedadTooltip(false)}>
                        <img src="images/Iconos/Icono19.png" className="icono7" />
                        {showNovedadTooltip && <Tooltip text="Novedades" />}
                    </Link>*/}

                    {/* Enlace a la página de ajustes
                    <Link to="/Ajustes" className="nav-link tooltip1"
                        onMouseEnter={() => setShowAjustesTooltip(true)}
                        onMouseLeave={() => setShowAjustesTooltip(false)}>
                        <img src="images/Iconos/Icono3.png" className="icono6" />
                        {showAjustesTooltip && <Tooltip text="Ajustes" />}
                    </Link> */}

                    {/* Menú desplegable del perfil */}
                    <div className="profile-menu"
                        onMouseEnter={() => setShowProfileTooltip(true)}
                        onMouseLeave={() => setShowProfileTooltip(false)}>
                        {showProfileTooltip && <Tooltip text="Perfil" />}
                        <img src="images/Iconos/Icono12.png" className="icono2"
                            onClick={toggleProfileMenu} />
                        {isProfileMenuOpen && (
                            <ul className="profile-menu-dropdown">
                                <li>
                                    <Link to="/Ajustes" className="nav-link profile-link"
                                        onClick={toggleProfileMenu}>
                                        Ver Ajustes
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="nav-link profile-link" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default Header;