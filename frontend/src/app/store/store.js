import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import myUrlsReducer from "./slices/myUrlSlice";
import profileInfoReducer from "./slices/profileSlice";
import urlsReducer from "./slices/urlSlice";
import menuReducer from './slices/menuSlice'

const reducer = {
    auth: authReducer,
    message: messageReducer,
    myurl: myUrlsReducer,
    profile: profileInfoReducer,
    urls: urlsReducer,
    menu: menuReducer,
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});