const ACCESS_TOKEN: string = 'accessToken';

const getToken = () => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (!accessToken) {
        accessToken = sessionStorage.getItem(ACCESS_TOKEN);
    }
    return accessToken;
}

const setToken = (accessToken: string, remember: boolean) => {
    if (remember) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
    } else {
        sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    }
}

const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(ACCESS_TOKEN);
}

export {getToken, setToken, removeToken}