import { API_URL_MY_URL } from '../constants'
import privateFetch from '../axios'

const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    return { headers }
}

const getMultipartheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'multipart/form-data',
    }
    return { headers }
}

const getAllUrl = () => {
    return privateFetch
        .get(API_URL_MY_URL, { withCredentials: true, ...getheaders() })
        .then((response) => {
            return response.data;
        });
}

const createNewUrl = (body) => {
    const formData = new FormData();

    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });

    return privateFetch
        .post(
            API_URL_MY_URL, formData, { withCredentials: true, ...getMultipartheaders() }
        )
        .then((response) => {
            return response.data;
        });
}

const updateUrl = (body) => {
    const formData = new FormData();

    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });

    return privateFetch
        .put(
            API_URL_MY_URL + "link/" + body._id, formData, { withCredentials: true, ...getMultipartheaders() }
        )
        .then((response) => {
            return response.data;
        });
}

const reorderUrls = (body) => {
    return privateFetch
        .put(
            API_URL_MY_URL + 'reorder', body, { withCredentials: true, ...getheaders() }
        )
        .then((response) => {
            return response.data;
        });
}

const deleteUrl = (id) => {
    return privateFetch
        .delete(API_URL_MY_URL + 'link/' + id, { withCredentials: true, ...getheaders() })
        .then((response) => {
            return response.data;
        });
}

const myUrlService = {
    getAllUrl,
    createNewUrl,
    updateUrl,
    reorderUrls,
    deleteUrl,
}

export default myUrlService;

