
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
    }
    return '';
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
const isValidToken = async (token) => {
    try {
        const response = await fetch(`https://localhost:7143/api/checkauth`, {
            method: 'POST',
            body: { 'token': `Bearer ${ token }`}
});
        if (!response.ok) {
            return false
        }console.log(response)
        const data = await response.json();
        return(data);
    } catch (error) {
        return false
    }
};

//Funciones para el id
