import { auth } from '@/utils';
import { message } from 'antd';
import axios from 'axios';

let errorFlag = false;

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
    if (!errorFlag) {
      errorFlag = true; // 设置标记
      if (error.response?.status === 401) {
        auth.clearUserInfo();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (error.code === 'ECONNABORTED') {
        message.error('请求超时，请稍后再试');
      } else if (error.code === 'ERR_NETWORK') {
        message.error('网络错误，请检查网络连接');
      } else {
        message.error('发生错误');
      }

      // 1秒后允许再次弹出错误
      setTimeout(() => {
        errorFlag = false;
      }, 1000);
    }
    return Promise.reject(error);
  },
);

export default request;
