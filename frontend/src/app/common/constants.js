export const APP_NAME = 'UniURL';
export const LOCAL_STORAGE_NAME = 'user';
const API_URL = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_BASE_URL : 'http://localhost:3005'

export const API_URL_PROFILE = API_URL + "/api/profile/";
export const API_URL_AUTH = API_URL + "/api/user/";
export const API_URL_MY_URL = API_URL + '/api/url/';
export const API_URL_URL = API_URL + '/api/public_urls/';
export const API_URL_THEME = API_URL + '/api/theme/'



export const ICON_ARRAY = [
    { name: 'url', icon: 'fas fa-link' },
    { name: 'facebook', icon: 'fab fa-facebook-f' },
    { name: 'instagram', icon: 'fab fa-instagram' },
    { name: 'snapchat', icon: 'fab fa-snapchat' },
    { name: 'x', icon: 'fab fa-x-twitter' },
    { name: 'whatsapp', icon: 'fab fa-whatsapp' },
    { name: 'telegram', icon: 'fab fa-telegram' },
    { name: 'reddit', icon: 'fab fa-reddit-alien' },
    { name: 'linked in', icon: 'fab fa-linkedin-in' },
    { name: 'youtube', icon: 'fab fa-youtube' },
    { name: 'pinterest', icon: 'fab fa-pinterest-p' },
    { name: 'github', icon: 'fab fa-github' },
    { name: 'soundcloud', icon: 'fab fa-soundcloud' },
    { name: 'spotify', icon: 'fab fa-spotify' },
    { name: 'itunes', icon: 'fab fa-itunes' },
    { name: 'discord', icon: 'fab fa-discord' },
    { name: 'twitch', icon: 'fab fa-twitch' },
    { name: 'medium', icon: 'fab fa-medium' },
    { name: 'codepen', icon: 'fab fa-codepen' },
    { name: 'quora', icon: 'fab fa-quora' },
    { name: 'js fiddle', icon: 'fab fa-jsfiddle' },
    { name: 'figma', icon: 'fab fa-figma' },
    { name: 'hashtag', icon: 'fas fa-hashtag' },
    { name: 'music', icon: 'fas fa-music' },
];