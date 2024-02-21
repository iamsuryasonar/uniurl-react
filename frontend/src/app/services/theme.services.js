import axios from 'axios'
import { LOCAL_STORAGE_NAME, API_URL_THEME } from '../common/constants';

const getheaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).token}`,
    }
    return { headers }
}
const getTheme = async () => {
    const response = await axios
        .get(API_URL_THEME ,getheaders());
    return response.data;
}

const ThemeService = {
    getTheme,
}

export default ThemeService;