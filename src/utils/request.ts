import { auth } from '@/utils';
import { message } from 'antd';
import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    if (
      response.data.code !== 200 &&
      !response.request.responseURL.includes('/login')
    ) {
      message.error(response.data.msg);
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      auth.clearUserInfo();
      // message.error('未登录或登录超时。请重新登录');
      setTimeout(() => {
        window.location.reload();
      }, 500);

      return;
    }
    if (error.code === 'ECONNABORTED') {
      message.error('请求超时');
      return;
    }
    if (error.code === 'ERR_NETWORK') {
      message.error('网络错误');
      return;
    }
    return Promise.reject(error);
  },
);

export default request;
