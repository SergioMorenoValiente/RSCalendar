import { jwtDecode } from "jwt-decode";

//Funciones para el token
export const setUserJwt = (userJwt) => {
    try {
        localStorage.setItem('userJwt', userJwt);
    } catch (error) {
        console.error(error);
    }
};

export const getStoredUserJwt = () => {
    try {
        const userJwt = localStorage.getItem('userJwt');
        return userJwt || '';
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const removeStoredUserJwt = () => {
    try {
        localStorage.removeItem('userJwt');
    } catch (error) {
        console.error(error);
    }
};

export const isUserAuthenticated = async () => {
    const userJwt = getStoredUserJwt();
    if (!userJwt) {
        return false;
    }
    try {
        const tokenValidation = await isValidToken(userJwt);
        if (tokenValidation) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
};

export const getUserEmail = () => {
    const userJwt = localStorage.getItem('userJwt');
    let mail = "";
    let mailTratado = "";
    if (userJwt) {
        try {
            const decodedToken = jwtDecode(userJwt);
            mail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            if (decodedToken && mail) {
                const parts = mail.split(' ');
                if (parts.length >= 2) {
                    mailTratado = parts.slice(1).join(' ');
                } else {
                    mailTratado = mail;
                }
                console.log(mailTratado);
                return mailTratado;
            }
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
        }
    }
    return '';
};




const isValidToken = async (token) => {
    try {
        const response = await fetch(`https://localhost:7143/checkauth?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        getUserEmail();//Esto es de prueba
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
};


//Funciones para el id

export const setUserId = (userId) => {
    try {
        localStorage.setItem('userId', userId);
    } catch (error) {
        console.error(error);
    }
};

export const getStoredUserId = () => {
    try {
        const userId = localStorage.getItem('userId');
        return userId || '';
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const removeStoredUserId = () => {
    try {
        localStorage.removeItem('userId');
    } catch (error) {
        console.error(error);
    }
};
