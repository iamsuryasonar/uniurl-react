import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { LOCAL_STORAGE_NAME } from '../../common/constants'
import AuthService from "../../services/auth.services";
import { setLoading } from "./loadingSlice";

const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

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
            }, 2000);
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
            return { user: data.data };
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
            }, 2000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            }).addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
            }).addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            }).addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            }).addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    }
});

const { reducer } = authSlice;
export default reducer;
