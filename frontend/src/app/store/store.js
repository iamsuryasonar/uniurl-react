import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import myUrlsReducer from "./slices/myUrlSlice";
import profileInfoReducer from "./slices/profileSlice";
import urlsReducer from "./slices/urlSlice";
import menuReducer from './slices/menuSlice'
import loadingReducer from "./slices/loadingSlice";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    myurl: myUrlsReducer,
    profile: profileInfoReducer,
    urlsinfo: urlsReducer,
    menu: menuReducer,
    loading: loadingReducer,
}


export const store = configureStore({
    reducer: reducer,
    devTools: true,
});
