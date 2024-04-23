const USER_INFO: string = 'userInfo';

const getToken = () => {
    const user = getUserInfo();
    if (user) {
        return user.token;
    }
};

const setUserInfo = (userInfo: object, remember: boolean) => {
    if (remember) {
        localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    } else {
        sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    }
};

const getUserInfo = () => {
    let userInfo = localStorage.getItem(USER_INFO);
    if (!userInfo) {
        userInfo = sessionStorage.getItem(USER_INFO);
    }
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
};

const clearUserInfo = () => {
    localStorage.removeItem(USER_INFO);
    sessionStorage.removeItem(USER_INFO);
};

export { clearUserInfo, getToken, getUserInfo, setUserInfo };
