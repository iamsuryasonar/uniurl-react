import { API_URL_PROFILE } from '../constants';
import privateFetch from '../axios';

const getMultipartheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'multipart/form-data',
    }
    return { headers }
}

const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    }
    return { headers }
}

const getProfileInfo = async () => {
    const response = await privateFetch
        .get(API_URL_PROFILE + 'profile-info', getheaders());
    return response.data;
}

const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    await privateFetch.post(API_URL_PROFILE + 'profile-upload', formData, getMultipartheaders())
        .then((response) => {
            return response.data;
        })
};

const updateProfileInfo = async (body) => {
    const response = await privateFetch
        .put(
            API_URL_PROFILE + 'profile-info', body, getheaders()
        );
    return response.data;
}

const isUsernameExists = async (username) => {
    const response = await privateFetch
        .get(
            API_URL_PROFILE + 'is_username_exist/' + username,
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