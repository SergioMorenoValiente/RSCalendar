import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Importación de Componentes
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

function App() {

    //INICIO DE SESION DEL USUARIO
    //Para gestionar el estado de inicio de sesión del usuario
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Función para manejar el inicio de sesión del usuario
    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    //Función para manejar el cierre de sesión del usuario
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileMenuOpen(false);
    }


    //BARRA LATERAL
    //Para gestionar la visibilidad de la barra lateral
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //Función para alternar la visibilidad de la barra lateral
    const toggleSidebar = () => {
        setIsProfileMenuOpen(false);
        setIsSidebarOpen(!isSidebarOpen);
    };


    //MENÚ DESPLEGABLE DEL PERFIL
    //Para gestionar la visibilidad del menú desplegable del perfil
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    //Función para manejar el cambio de barra lateral
    const handleSidebarToggle = () => {
        setIsProfileMenuOpen(false); 
        setIsSidebarOpen(!isSidebarOpen);
    };

    

    return (
        <Router>
            <div>
                <div className="App1">

                    {/* Vista cuando la sesión está iniciada */}
                    <Header onSidebarToggle={handleSidebarToggle}
                        setIsSidebarOpen={setIsSidebarOpen}
                        isProfileMenuOpen={isProfileMenuOpen}
                        onLogout={handleLogout} />

                    {/* Rutas para movernos entre los diferentes componentes */}
                    <Routes>
                        <Route path="/" element={
                            <main>

                                {/* Componente principal: Calendario */}
                                <Calendar
                                isSidebarOpen={isSidebarOpen}
                                toggleSidebar={toggleSidebar} />
                            </main>}
                        />
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
            </div>
        </Router>
    );
}

export default App;


//<Router>
//    <div>
//        {isLoggedIn ?
//            <div className="App1">

//                {/* Vista cuando la sesión está iniciada */}
//                <Header onSidebarToggle={handleSidebarToggle}
//                    setIsSidebarOpen={setIsSidebarOpen}
//                    isProfileMenuOpen={isProfileMenuOpen}
//                    onLogout={handleLogout} />

//                {/* Rutas para movernos entre los diferentes componentes */}
//                <Routes>
//                    <Route path="/" element={
//                        <main>

//                            {/* Componente principal: Calendario */}
//                            <Calendar
//                                isSidebarOpen={isSidebarOpen}
//                                toggleSidebar={toggleSidebar} />
//                        </main>}
//                    />
//                    <Route path="/SobreNosotros" element={<SobreNosotros />} />
//                    <Route path="/DeclaracionDeAccesibilidad" element={<DeclaracionDeAccesibilidad />} />
//                    <Route path="/Ajustes" element={<Ajustes />} />
//                    <Route path="/Perfil" element={<Perfil />} />
//                    <Route path="/CrearEventoTarea" element={<CrearEventoTarea />} />
//                    <Route path="/EditarEvento" element={<EditarEvento />} />
//                    <Route path="/EditarTarea" element={<EditarTarea />} />
//                </Routes>
//                <Footer />
//            </div> :
//            < div className="App2">

//                {/* Vista cuando no hay una sesión iniciada */}
//                <Login onLogin={handleLogin} />
//            </div>
//        }
//    </div>
//</Router>