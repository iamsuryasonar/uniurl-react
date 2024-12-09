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
    return axios
        .post(API_URL_AUTH + "google_login", code)
        .then((response) => {
            if (response.data.data.name) {
                console.log(response.data)
                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(response.data.data));
            }
            return response.data.data;
        });
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