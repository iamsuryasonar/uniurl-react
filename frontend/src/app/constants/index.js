export const APP_NAME = 'UniURL';
export const LOCAL_STORAGE_NAME = 'uniurl_user_local_storage';
const API_URL = (process.env.NODE_ENV === 'developmanet') ? process.env.REACT_APP_BASE_URL : 'http://localhost:3005'

export const API_URL_PROFILE = API_URL + "/api/profile/";
export const API_URL_AUTH = API_URL + "/api/user/";
export const API_URL_MY_URL = API_URL + '/api/url/';
export const API_URL_URL = API_URL + '/api/public_urls/';
export const API_URL_THEME = API_URL + '/api/theme/'

export const ICON_ARRAY = [
    { name: 'url', icon: 'fas fa-link' },
    { name: 'facebook', icon: 'fab fa-facebook-f' },
    { name: 'instagram', icon: 'fab fa-instagram' },
    { name: 'tiktok', icon: 'fab fa-tiktok' },
    { name: 'snapchat', icon: 'fab fa-snapchat' },
    { name: 'x', icon: 'fab fa-x-twitter' },
    { name: 'whatsapp', icon: 'fab fa-whatsapp' },
    { name: 'facebook-messenger', icon: 'fab fa-facebook-messenger' },
    { name: 'telegram', icon: 'fab fa-telegram' },
    { name: 'linked in', icon: 'fab fa-linkedin-in' },
    { name: 'reddit', icon: 'fab fa-reddit-alien' },
    { name: 'youtube', icon: 'fab fa-youtube' },
    { name: 'twitch', icon: 'fab fa-twitch' },
    { name: 'google', icon: 'fab fa-google' },
    { name: 'dropbox', icon: 'fab fa-dropbox' },
    { name: 'pinterest', icon: 'fab fa-pinterest-p' },
    { name: 'github', icon: 'fab fa-github' },
    { name: 'soundcloud', icon: 'fab fa-soundcloud' },
    { name: 'spotify', icon: 'fab fa-spotify' },
    { name: 'google-play', icon: 'fab fa-google-play' },
    { name: 'itunes', icon: 'fab fa-itunes' },
    { name: 'discord', icon: 'fab fa-discord' },
    { name: 'twitch', icon: 'fab fa-twitch' },
    { name: 'medium', icon: 'fab fa-medium' },
    { name: 'codepen', icon: 'fab fa-codepen' },
    { name: 'quora', icon: 'fab fa-quora' },
    { name: 'js fiddle', icon: 'fab fa-jsfiddle' },
    { name: 'figma', icon: 'fab fa-figma' },
    { name: 'music', icon: 'fas fa-music' },
    { name: 'call', icon: 'fas fa-phone' },
    { name: 'email', icon: 'fas fa-envelope' },
    { name: 'hashtag', icon: 'fas fa-hashtag' },
];