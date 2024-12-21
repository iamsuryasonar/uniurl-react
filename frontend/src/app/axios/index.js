import axios from 'axios';
import { LOCAL_STORAGE_NAME } from '../constants';

const privateFetch = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

privateFetch.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.token || null;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.withCredentials = true;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default privateFetch;