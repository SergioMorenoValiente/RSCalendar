import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import SobreNosotros from './components/SobreNosotros/SobreNosotros';
import Ajustes from './components/Ajustes/Ajustes';
import Perfil from './components/Perfil/Perfil';
import CrearEventoTarea from './components/CrearEventoTarea/CrearEventoTarea';
import DeclaracionDeAccesibilidad from './components/DeclaracionDeAccesibilidad/DeclaracionDeAccesibilidad';
import EditarEvento from './components/EditarEventoTarea/EditarEvento';
import EditarTarea from './components/EditarEventoTarea/EditarTarea';
import { isUserAuthenticated, getStoredUserJwt, getStoredUserId } from './components/Utils';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await isUserAuthenticated() || getStoredUserJwt();
            setIsLoggedIn(token);
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <Router>
            <div>
                <div className="App1">
                    {isLoggedIn ? <AuthenticatedRoutes setIsLoggedIn={setIsLoggedIn} /> : <Login onLogin={() => setIsLoggedIn(true)} />}
                </div>
            </div>
        </Router>
    );
}

function AuthenticatedRoutes({ setIsLoggedIn }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileMenuOpen(false);
    }

    const handleSidebarToggle = () => {
        setIsProfileMenuOpen(false);
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Header onSidebarToggle={handleSidebarToggle}
                setIsSidebarOpen={setIsSidebarOpen}
                isProfileMenuOpen={isProfileMenuOpen}
                onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Calendar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
                <Route path="/SobreNosotros" element={<SobreNosotros />} />
                <Route path="/DeclaracionDeAccesibilidad" element={<DeclaracionDeAccesibilidad />} />
                <Route path="/Ajustes" element={<Ajustes />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/CrearEventoTarea" element={<CrearEventoTarea />} />
                <Route path="/EditarEvento" element={<EditarEvento />} />
                <Route path="/EditarTarea" element={<EditarTarea />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
