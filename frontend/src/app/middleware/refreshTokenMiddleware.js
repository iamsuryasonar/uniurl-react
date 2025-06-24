import { logout, refresh_token } from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";

//todo - use axios middleware instead for refresh access token
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
        const token = store.getState().auth?.user.token;

        try {
            if (token) {
                const expiresIn = jwtDecode(token).exp * 1000 - Date.now();
                if (expiresIn < 300000) {
                    const result = await store.dispatch(refresh_token());

                    const newToken = store.getState().auth?.user.token;
                    if (!newToken || result.error) {
                        throw new Error("Access token refresh failed");
                    }
                }
            } else {
                console.log('no token found')
                store.dispatch(logout());
                return;
            }
        } catch (error) {
            console.error("Refresh token failed:", error.message);

            store.dispatch(logout());
            return;
        }
    }

    return next(action);
}