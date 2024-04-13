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

    const [emailrError, setEmailrError] = useState('');
    const [passwordrError, setPasswordrError] = useState('');

    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loginError, setloginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailErrorVisible, setEmailErrorVisible] = useState(false);
    const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);

    const [emailrErrorVisible, setEmailrErrorVisible] = useState(false);
    const [passwordrErrorVisible, setPasswordrErrorVisible] = useState(false);

    const [confirmPasswordErrorVisible, setConfirmPasswordErrorVisible] = useState(false);
    const [loginErrorVisible, setLoginErrorVisible] = useState(false);
    const [usernameErrorVisible, setUsernameErrorVisible] = useState(false);

    //Funcionalidad inicio de sesion
    const handleLogin = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setloginError('');

        let hasError = false;

        if (!email) {
            setEmailError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setEmailErrorVisible(true);
            setLoginErrorVisible(false);
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('¡Despliega tus alas! Escribe un correo válido para elevar tu cuenta.');
            setEmailErrorVisible(true);
            setLoginErrorVisible(false);
            hasError = true;
        } else {
            setEmailError('');
            setEmailErrorVisible(false);
        }

        if (!password) {
            setPasswordError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setLoginErrorVisible(false);
            setPasswordErrorVisible(true);
            hasError = true;
        } else {
            setPasswordError('');
            setPasswordErrorVisible(false);
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
                            window.location.href = `/`;
                        } else {
                            setloginError('¡Un eco en la Grieta! Este invocador no se encuentra en nuestros registros.');
                        }
                    }
                } catch (error) {
                    console.error('¡Un velo oscuro cubre el ID de usuario! Algo ha fallado en la obtención. Intenta de nuevo y despeja las sombras:', error);
                }
            } else {
                setloginError('¡Este invocador es una sombra en la Grieta! Escribe un usuario válido.');
                setLoginErrorVisible(true);
            }
        } catch (error) {
            console.error('¡Un contratiempo en la entrada! Algo ha ido mal en la Grieta:', error);
            setloginError('¡Un contratiempo en la entrada! Algo ha ido mal en la Grieta. Intenta nuevamente desplegando tus habilidades.');
        }
    };

    //Funcionalidad registro de usuario
    const handleRegister = async () => {
        setEmailrError('');
        setUsernameError('');
        setPasswordrError('');
        setConfirmPasswordError('');

        let hasError = false;

        if (!email) {
            setEmailrError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setEmailrErrorVisible(true);
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailrError('¡Despliega tus alas! Escribe un correo válido para elevar tu cuenta.');
            setEmailrErrorVisible(true);
            hasError = true;
        } else {
            setEmailrError('');
            setEmailrErrorVisible(false);
        }

        if (!username) {
            setUsernameError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setUsernameErrorVisible(true);
            hasError = true;
        }

        if (!password) {
            setPasswordrError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setPasswordrErrorVisible(true);
            hasError = true;
        } else if (!validatePassword(password)) {
            setPasswordrError('¡Tu escudo debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo!');
            setPasswordrErrorVisible(true);
            hasError = true;
        } else {
            setPasswordrErrorVisible(false);
        }

        if (!confirmPassword) {
            setConfirmPasswordError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setConfirmPasswordErrorVisible(true);
            hasError = true;
        }else if (password !== confirmPassword) {
            setConfirmPasswordError('¡Un desacuerdo en las contraseñas bloquea tu camino hacia la Grieta.');
            setConfirmPasswordErrorVisible(true);
            hasError = true;
        } else {
            setConfirmPasswordErrorVisible(false);
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
            console.error('¡Un obstáculo en el camino! Algo salió mal en el registro. ¡Revisa tus acciones e inténtalo nuevamente!:', error);
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
                                onClick={() => {
                                    setEmailError('');
                                    setEmailErrorVisible(false);
                                }}
                                className={emailErrorVisible ? 'error' : ''}
                            />
                            {emailErrorVisible && (
                                <div className="validacionlogin">
                                    <img src="images/Iconos/Icono21.png" className="icono10" />
                                    <p className="plogin">{emailError}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onClick={() => {
                                    setPasswordError('');
                                    setPasswordErrorVisible(false);
                                }}
                                className={passwordErrorVisible ? 'error' : ''}
                            />
                            {passwordErrorVisible && (
                                <div className="validacionlogin">
                                    <img src="images/Iconos/Icono21.png" className="icono10" />
                                    <p className="plogin">{passwordError}</p>
                                </div>
                            )}
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

                        {loginErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{loginError}</p>
                            </div>
                        )}
                        <button type="submit" className="login-form-button"
                        >Iniciar sesión</button>
                    </form>
                    <div className="remember-forgot">
                        <a href="#" onClick={() => {
                            handleLoginClick();
                            setEmailrErrorVisible(false);
                            setUsernameErrorVisible(false);
                            setPasswordrErrorVisible(false);
                            setConfirmPasswordErrorVisible(false);
                        }}>¿No estás registrado?</a>
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
                                    onClick={() => {
                                        setEmailrError('');
                                        setEmailrErrorVisible(false);
                                    }}
                                    className={emailrErrorVisible ? 'error' : ''}
                                />
                                {emailrErrorVisible && (
                                    <div className="validacionlogin">
                                        <img src="images/Iconos/Icono21.png" className="icono10" />
                                        <p className="plogin">{emailrError}</p>
                                    </div>
                                )}
                        </div>
                        <div>
                            <label htmlFor="username">Usuario:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onClick={() => {
                                        setUsernameError('');
                                        setUsernameErrorVisible(false);
                                    }}
                                    className={usernameErrorVisible ? 'error' : ''}
                                />
                                {usernameErrorVisible && (
                                    <div className="validacionlogin">
                                        <img src="images/Iconos/Icono21.png" className="icono10" />
                                        <p className="plogin">{usernameError}</p>
                                    </div>
                                )}
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onClick={() => {
                                        setPasswordrError('');
                                        setPasswordrErrorVisible(false);
                                    }}
                                    className={passwordrErrorVisible ? 'error' : ''}
                                />
                                {passwordrErrorVisible && (
                                    <div className="validacionlogin">
                                        <img src="images/Iconos/Icono21.png" className="icono10" />
                                        <p className="plogin">{passwordrError}</p>
                                    </div>
                                )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onClick={() => {
                                        setConfirmPasswordError('');
                                        setConfirmPasswordErrorVisible(false);
                                    }}
                                    className={confirmPasswordErrorVisible ? 'error' : ''}
                                />
                                {confirmPasswordErrorVisible && (
                                    <div className="validacionlogin">
                                        <img src="images/Iconos/Icono21.png" className="icono10" />
                                        <p className="plogin">{confirmPasswordError}</p>
                                    </div>
                                )}
                        </div>
                            <button type="button"
                                onClick={() => {
                                    handleRegisterClick();
                                    setEmailErrorVisible(false);
                                    setLoginErrorVisible(false);
                                    setPasswordErrorVisible(false);
                                }}>Registrarme</button>
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
