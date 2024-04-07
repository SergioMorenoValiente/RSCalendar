import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {

    //Para el formulario de inicio de sesión y el de registro
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [redirectToHome, setRedirectToHome] = useState(false);

    //INICIAR SESION
    //Función para manejar el inicio de sesión
    const handleLogin = () => {
        onLogin();
        setRedirectToHome(true);
    };

    //Función para mostrar el formulario de inicio de sesión
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    //Redirecciona a la página principal si el inicio de sesión es correcto
    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    //REGISTRAR
    //Función para mostrar el formulario de registro
    const handleRegisterClick = () => {
        setShowLogin(false);
    };

    return (
        <div className="login-container">
            {showLogin ? (

                //Formulario de inicio de sesión
            <div className="login-form">
                <h2>INICIAR SESIÓN</h2>
                <form>
                        <div>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="remember-forgot">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">Recordarme</label>
                    </div>

                    <div className="remember-forgot">
                        <a href="#">He olvidado mi contraseña</a>
                    </div>
                        <Link to="/" onClick={handleLogin}
                            className="login-form-button">Iniciar sesión</Link>
                </form>
                <div className="remember-forgot">
                    <a href="#" onClick={handleRegisterClick}>¿No estás registrado?</a>
                </div>
            </div>
            ) : (

                //Formulario de registro
                <div className="register-form">
                        <h2>REGISTRARME</h2>
                        <form>
                            <div>
                                <label htmlFor="email">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Usuario:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirmar Contraseña:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="button"
                                onClick={handleLoginClick}>Registrarme</button>
                        </form>
                        <div className="remember-forgot">
                            <a href="#"
                                onClick={handleLoginClick}>¿Ya estás registrado?</a>
                        </div>
                </div>
            )}
        </div>
    );
}

export default Login;