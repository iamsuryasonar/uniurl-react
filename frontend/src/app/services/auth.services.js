import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL_AUTH } from '../common/constants'



let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

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

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;