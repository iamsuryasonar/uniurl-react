export const APP_NAME = 'UniURL';
export const LOCAL_STORAGE_NAME = 'user';

const API_URL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_BASE_URL : 'http://localhost:3003'

export const API_URL_PROFILE = API_URL + "/api/profile/";
export const API_URL_AUTH = API_URL + "/api/user/";
export const API_URL_MY_URL = API_URL + '/api/url/';
export const API_URL_URL = API_URL + '/api/public_urls/';
