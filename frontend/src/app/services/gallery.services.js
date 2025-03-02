import { API_URL_GALLERY } from '../constants';
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

const getGalleryImages = async () => {
    const response = await privateFetch
        .get(API_URL_GALLERY, getheaders());
    return response.data;
}

const uploadGalleryImage = async (body) => {
    const { image, description } = body;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('description', description);

    await privateFetch.post(API_URL_GALLERY, formData, getMultipartheaders())
        .then((response) => {
            return response.data;
        })
};

const deleteImage = async (id) => {
    await privateFetch.delete(API_URL_GALLERY + `${id}`, getMultipartheaders())
        .then((response) => {
            return response.data;
        })
}

const GalleryService = {
    getGalleryImages,
    uploadGalleryImage,
    deleteImage,
}

export default GalleryService;