import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { LOCAL_STORAGE_NAME } from '../../constants'
import AuthService from "../../services/auth.services";
import { setLoading } from "./loadingSlice";

let storedData = localStorage.getItem(LOCAL_STORAGE_NAME);
const user = (storedData && storedData !== 'undefined') ? JSON.parse(storedData) : null;

export const register = createAsyncThunk(
    "auth/register",
    async (creds, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await AuthService.register(creds);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 2300);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (creds, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const data = await AuthService.login(creds);
            return data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 2300);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const google_login = createAsyncThunk(
    "auth/google_login",
    async (code, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const data = await AuthService.googleLogin(code);
            return data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 2300);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const refresh_token = createAsyncThunk(
    "auth/refresh_token",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const res = await AuthService.refresh_token();
            return res;
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(logout());
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 2300);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        localStorage.removeItem(LOCAL_STORAGE_NAME);
        return;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        thunkAPI.dispatch(setMessage(message));
        let payload = {
            data: error.response.data,
            status: error.response.status
        }
        return thunkAPI.rejectWithValue(payload);
    } finally {
        setTimeout(() => {
            thunkAPI.dispatch(clearMessage());
        }, 2300);
        thunkAPI.dispatch(setLoading(false));
    }
});

const initialState = user
    ? { isLoggedIn: true, user: user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;

                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(action.payload));
            }).addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(google_login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;

                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(action.payload));
            }).addCase(google_login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(refresh_token.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;

                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(action.payload));
            }).addCase(refresh_token.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(logout.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    }
});

const { reducer } = authSlice;
export default reducer;
