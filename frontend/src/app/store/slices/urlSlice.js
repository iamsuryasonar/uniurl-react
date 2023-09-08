import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import urlService from "../../services/urls.services";

export const get_urls = createAsyncThunk(
    "url/geturls",
    async (username, thunkAPI) => {
        try {
            const response = await urlService.getUrls(username);
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
        }
    }
);


const initialState = { urls: null };

const urlSlice = createSlice({
    name: "urls",
    initialState,
    extraReducers: {
        [get_urls.fulfilled]: (state, action) => {
            state.urls = action.payload;
        },
        [get_urls.rejected]: (state, action) => {
        },
    },
});

const { reducer } = urlSlice;
export default reducer;