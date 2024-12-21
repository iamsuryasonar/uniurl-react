import axios from 'axios'
import { API_URL_URL } from '../constants';

const getUrls = async (username) => {
    const response = await axios
        .get(API_URL_URL + username);
    return response.data;
}

const urlService = {
    getUrls,
}

export default urlService;

