import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import { setUserJwt, setUserId } from '../Utils';

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePassword = (password) => {
    const regexLength = /.{8,}/;
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexNumber = /[0-9]/;
    const regexSymbol = /[^A-Za-z0-9]/;

    return (
        regexLength.test(password) &&
        regexUppercase.test(password) &&
        regexLowercase.test(password) &&
        regexNumber.test(password) &&
        regexSymbol.test(password)
    );
};
function Login({ onLogin }) {
    // Para el formulario de inicio de sesión y registro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loginError, setloginError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    //Funcionalidad inicio de sesion
    const handleLogin = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setloginError('');

        let hasError = false;

        if (!email) {
            setEmailError('Rellena el campo');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Cara guapa, ingresa un correo electrónico válido.');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Rellena el campo');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch('https://localhost:7143/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, contrasena: password })
            });

            if (response.ok) {
                const data = await response.json();

                const token = data.token;
                setUserJwt(token);
                onLogin();

                try {
                    const response = await fetch('https://localhost:7143/api/Usuarios', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    if (response.ok) {
                        const allUsers = await response.json();
                        const userWithEmail = allUsers.find(user => user.email === email);
                        if (userWithEmail) {
                            const userId = userWithEmail.id;
                            setUserId(userId);
                            setRedirectToHome(true);
                        } else {
                            setloginError('Este usuario no existe');
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener el ID de usuario:', error);
                }
            } else {
                setloginError('Este usuario no existe');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setloginError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    //Funcionalidad registro de usuario
    const handleRegister = async () => {
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let hasError = false;

        if (!email) {
            setEmailError('Rellena el campo');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Ingresa un correo electrónico válido.');
            hasError = true;
        }
        if (!username) {
            setUsernameError('Rellena el campo');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Rellena el campo');
            hasError = true;
        } else if (!validatePassword(password)) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.');
            hasError = true;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden.');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch('https://localhost:7143/api/Usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    contrasena: password,
                    nombre: username
                })
            });
            if (response.ok) {
                setShowLogin(true);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };


    // Función para mostrar el formulario de inicio de sesión o registro
    const handleLoginClick = () => {
        setShowLogin(!showLogin);
    };

    // Redirecciona a la página principal si el inicio de sesión es correcto
    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    // Función para mostrar el formulario de registro
    const handleRegisterClick = () => {
        setShowLogin(false);
        handleRegister();
    };

    return (
        <div className="login-container">
            {showLogin ? (
                // Formulario de inicio de sesión
                <div className="login-form">
                    <h2>INICIAR SESIÓN</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p>{emailError}</p>
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p>{passwordError}</p>
                        </div>
                        {/*<div className="remember-forgot">*/}
                        {/*    <input*/}
                        {/*        type="checkbox"*/}
                        {/*        id="remember"*/}
                        {/*        checked={rememberMe}*/}
                        {/*        onChange={(e) => setRememberMe(e.target.checked)}*/}
                        {/*    />*/}
                        {/*    <label htmlFor="remember">Recordarme</label>*/}
                        {/*</div>*/}
                        {/*<div className="remember-forgot">*/}
                        {/*    <a href="#">He olvidado mi contraseña</a>*/}
                        {/*</div>*/}

                        <p>{loginError}</p>
                        <button type="submit" className="login-form-button">Iniciar sesión</button>
                    </form>
                    <div className="remember-forgot">
                        <a href="#" onClick={handleLoginClick}>¿No estás registrado?</a>
                    </div>
                </div>
            ) : (
                // Formulario de registro
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
                                <p>{emailError}</p>
                        </div>
                        <div>
                            <label htmlFor="username">Usuario:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                />
                                <p>{usernameError}</p>
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                <p>{passwordError}</p>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <p>{confirmPasswordError}</p>
                        </div>
                            <button type="button" onClick={handleRegisterClick}>Registrarme</button>
                    </form>
                    <div className="remember-forgot">
                        <a href="#" onClick={handleLoginClick}>¿Ya estás registrado?</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
