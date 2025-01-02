import axios from 'axios'
import { LOCAL_STORAGE_NAME, API_URL_MY_URL } from '../common/constants'


const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).token}`,
    }
    return { headers }
}

const getAllUrl = () => {
    return axios
        .get(API_URL_MY_URL, getheaders())
        .then((response) => {
            return response.data;
        });
}

const createNewUrl = (body) => {
    return axios
        .post(
            API_URL_MY_URL, body, getheaders()
        )
        .then((response) => {
            return response.data;
        });
}
const reorderUrls = (body) => {
    return axios
        .put(
            API_URL_MY_URL + 'reorder', body, getheaders()
        )
        .then((response) => {
            return response.data;
        });
}

const deleteUrl = (id) => {
    return axios
        .delete(API_URL_MY_URL + 'link/' + id, getheaders())
        .then((response) => {
            return response.data;
        });
}

const myUrlService = {
    getAllUrl,
    createNewUrl,
    deleteUrl,
    reorderUrls,
}

export default myUrlService;

