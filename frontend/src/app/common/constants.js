export const APP_NAME = 'UniURL';
export const LOCAL_STORAGE_NAME = 'user';
const PRODUCTION_API_URL = process.env.REACT_APP_BASE_URL;
const LOCAL_API_URL = 'http://localhost:3002'

export const API_URL_PROFILE = process.env.NODE_ENV = 'production' ? PRODUCTION_API_URL : LOCAL_API_URL + "/api/profile/";
export const API_URL_AUTH = process.env.NODE_ENV = 'production' ? PRODUCTION_API_URL : API_ULOCAL_API_URLRL + "/api/user/";
export const API_URL_MY_URL = process.env.NODE_ENV = 'production' ? PRODUCTION_API_URL : LOCAL_API_URL + '/api/url/';
export const API_URL_URL = process.env.NODE_ENV = 'production' ? PRODUCTION_API_URL : LOCAL_API_URL + '/api/public_urls/';
