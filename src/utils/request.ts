import axios from 'axios';
import {auth} from "@/utils";
import {message} from "antd";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    }
});

request.interceptors.request.use(
    config => {
        const token = auth.getToken()
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        if (response.data.code !== 200 && !response.request.responseURL.includes('/login')) {
            message.error(response.data.msg);
        }
        return response.data;
    },
    error => {
        if (error.response?.status === 401) {
            auth.removeToken();
            window.location.reload();
            message.warning('登录失效');
            return;
        }
        if (error.code === 'ECONNABORTED') {
            message.error('请求超时');
            return;
        }
        return Promise.reject(error);
    },
);

export default request;
