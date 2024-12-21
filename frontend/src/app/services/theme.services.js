import privateFetch from '../axios';
import { API_URL_THEME } from '../constants';

const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    }
    return { headers }
}
const getTheme = async () => {
    const response = await privateFetch
        .get(API_URL_THEME, getheaders());
    return response.data;
}

const ThemeService = {
    getTheme,
}

export default ThemeService;