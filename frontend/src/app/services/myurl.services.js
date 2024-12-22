import { API_URL_MY_URL } from '../constants'
import privateFetch from '../axios'

const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    return { headers }
}

const getAllUrl = () => {
    return privateFetch
        .get(API_URL_MY_URL, getheaders())
        .then((response) => {
            return response.data;
        });
}

const createNewUrl = (body) => {
    return privateFetch
        .post(
            API_URL_MY_URL, body, getheaders()
        )
        .then((response) => {
            return response.data;
        });
}

const deleteUrl = (id) => {
    return privateFetch
        .delete(API_URL_MY_URL + id, getheaders())
        .then((response) => {
            return response.data;
        });
}

const myUrlService = {
    getAllUrl,
    createNewUrl,
    deleteUrl,
}

export default myUrlService;

