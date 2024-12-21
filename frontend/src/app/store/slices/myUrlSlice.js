import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import myUrlService from "../../services/myurl.services";
import { setLoading } from "./loadingSlice";

export const get_my_urls = createAsyncThunk(
    "url/geturl",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await myUrlService.getAllUrl();
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
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const create_my_urls = createAsyncThunk(
    "url/create_url",
    async (url, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await myUrlService.createNewUrl(url);
            thunkAPI.dispatch(get_my_urls());
            thunkAPI.dispatch(setMessage(response.message));
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
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const delete_my_url = createAsyncThunk(
    "url/deleteurl",
    async (url, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await myUrlService.deleteUrl(url);
            thunkAPI.dispatch(get_my_urls());
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
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const initialState = { myurls: null };

const myUrlSlice = createSlice({
    name: "myurls",
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(get_my_urls.fulfilled, (state, action) => {
                    state.urls = action.payload;
                }).addCase(get_my_urls.rejected, (state, action) => {
                }).addCase(create_my_urls.fulfilled, (state, action) => {
                }).addCase(create_my_urls.rejected, (state, action) => {
                }).addCase(delete_my_url.fulfilled, (state, action) => {
                }).addCase(delete_my_url.rejected, (state, action) => {
                })
        },
});

const { reducer } = myUrlSlice;
export default reducer;
