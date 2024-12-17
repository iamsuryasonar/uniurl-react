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
const getProfileInfo = async () => {
    const response = await axios
        .get(API_URL_PROFILE + 'profile-info', getheaders());
    return response.data;
}

const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(API_URL_PROFILE + 'profile-upload', formData, getMultipartheaders())
        .then((response) => {
            return response.data;
        })
};


const updateProfileInfo = async (body) => {
    const response = await axios
        .put(
            API_URL_PROFILE + 'profile-info', body, getheaders()
        );
    return response.data;
}

const isUsernameExists = async (username) => {
    const response = await axios
        .get(
            API_URL_PROFILE + 'is_username_exist/' + username
        );
    return response.data;
}


const ProfileService = {
    getProfileInfo,
    uploadProfilePicture,
    updateProfileInfo,
    isUsernameExists,
}

export default ProfileService;