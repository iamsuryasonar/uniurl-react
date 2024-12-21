import { logout, refresh_token } from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";

export const refreshTokenMiddleware = (store) => (next) => async (action) => {

    const protectedActions = [
        "url/geturl/pending",
        "url/create_url/pending",
        "url/deleteurl/pending",
        "profile/upload/pending",
        "profile/getprofile/pending",
        "profile/update/pending",
    ];

    if (protectedActions.indexOf(action.type) !== -1) {
        const state = store.getState();
        const token = state.auth?.user.token;

        if (token) {
            const expiresIn = jwtDecode(token).exp * 1000 - Date.now();
            if (expiresIn < 30000) {
                try {
                    const result = await store.dispatch(refresh_token());

                    const newToken = store.getState().auth?.user.token;
                    if (!newToken || result.error) {
                        throw new Error("Access token refresh failed");
                    }
                } catch (error) {
                    console.error("Refresh token failed:", error.message);

                    store.dispatch(logout());
                    return;
                }
            }
        } else {
            store.dispatch(logout());
            return;
        }
    }

    return next(action);

}