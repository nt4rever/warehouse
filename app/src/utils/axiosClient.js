import axios from 'axios';
import { getLocalStorage, KEY_LOCAL_STORAGE } from './storage';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    timeout: 30000
});

axiosClient.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'application/json';
        if (getLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN))
            config.headers['Authorization'] = `Bearer ${getLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN)}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
