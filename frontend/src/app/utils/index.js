import { LOCAL_STORAGE_NAME } from "../constants";

export const getDataFromLocalStorage = () => {
    let storedData = localStorage.getItem(LOCAL_STORAGE_NAME)
    if (storedData && storedData !== 'undefined' && storedData !== 'null') {
        const data = JSON.parse(storedData);
        return data;
    } else {
        return null;
    }
}

export const setDataToLocalStorage = (data) => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
}
 
export const removeFromLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
}