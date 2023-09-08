import axios from 'axios'
import { API_URL_URL } from '../common/constants';


const getUrls = (username) => {
    return axios
        .get(API_URL_URL + username)
        .then((response) => {
            return response.data;
        });
}

const urlService = {
    getUrls,
}

export default urlService;

