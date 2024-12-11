import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL_AUTH } from '../common/constants'

const register = (creds) => {
    return axios.post(API_URL_AUTH + "register", creds);
}

const login = async (creds) => {
    return axios
        .post(API_URL_AUTH + "login", creds)
        .then((response) => {
            if (response.data.data.name) {
                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(response.data.data));
            }
            return response.data.data;
        });
}

const googleLogin = async (code) => {
    try {
        let response = await axios
            .post(API_URL_AUTH + "google_login", code)
            .then((response) => {
                if (response.data.data.name) {
                    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(response.data.data));
                    return response;
                }
            });
        return response;
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return {
            code: statusCode,
            message: error.response ? error.response.data : 'An unexpected error occurred'
        };
    }
}

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};

const AuthService = {
    register,
    login,
    googleLogin,
    logout,
    getCurrentUser,
}

export default AuthService;