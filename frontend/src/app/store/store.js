import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import myUrlsReducer from "./slices/myUrlSlice";
import profileInfoReducer from "./slices/profileSlice";
import urlsReducer from "./slices/urlSlice";
import menuReducer from './slices/menuSlice'
import loadingReducer from "./slices/loadingSlice";
import { refreshTokenMiddleware } from '../middleware/refreshTokenMiddleware';
import galleryReducer from './slices/galleryImageSlice';

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    myurl: myUrlsReducer,
    profile: profileInfoReducer,
    urlsinfo: urlsReducer,
    menu: menuReducer,
    loading: loadingReducer,
    gallery: galleryReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout/fulfilled') {
        state = undefined;
    }

    return reducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(refreshTokenMiddleware),
});
