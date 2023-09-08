import axios from 'axios'
import { LOCAL_STORAGE_NAME, API_URL_PROFILE } from '../common/constants';

const getMultipartheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).token}`,
    }
    return { headers }
}
const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).token}`,
    }
    return { headers }
}
const getProfileInfo = () => {
    return axios
        .get(API_URL_PROFILE + 'profile-info', getheaders())
        .then((response) => {
            return response.data;
        });
}

const uploadProfilePicture = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post(API_URL_PROFILE + 'profile-upload', formData, getMultipartheaders())
        .then((response) => {
            return response.data;
        })
};


const updateBioOrStatus = (body) => {
    return axios
        .put(
            API_URL_PROFILE + 'status_and_bio', body, getheaders()
        )
        .then((response) => {
            return response.data;
        });
}


const ProfileService = {
    getProfileInfo,
    uploadProfilePicture,
    updateBioOrStatus
}

export default ProfileService;