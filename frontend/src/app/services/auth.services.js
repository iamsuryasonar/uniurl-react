import axios from "axios";
import { API_URL_AUTH } from '../constants';
import { removeFromLocalStorage } from "../utils";

const register = (creds) => {
    return axios.post(API_URL_AUTH + "register", creds);
}

const login = async (creds) => {
    return axios
        .post(API_URL_AUTH + "login", creds, { withCredentials: true })
        .then((response) => {
            return response.data.data;
        });
}

const googleLogin = async (code) => {
    return axios
        .post(API_URL_AUTH + "google_login", code, { withCredentials: true })
        .then((response) => {
            return response.data.data
        });
}

const refresh_token = async () => {
    return axios.get(API_URL_AUTH + "refresh_token",
        { withCredentials: true }
    ).then((response) => {
        return response.data.data;
    })
};

const logout = () => {
    removeFromLocalStorage();
};

const AuthService = {
    register,
    login,
    refresh_token,
    googleLogin,
    logout,
}

export default AuthService;