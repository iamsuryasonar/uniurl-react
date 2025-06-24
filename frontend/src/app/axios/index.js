import axios from 'axios';
import { getDataFromLocalStorage } from '../utils';

const privateFetch = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

privateFetch.interceptors.request.use((config) => {
    const token = getDataFromLocalStorage()?.token || null;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default privateFetch;