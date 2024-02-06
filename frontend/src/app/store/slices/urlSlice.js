import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import { setLoading } from "./loadingSlice";
import urlService from "../../services/urls.services";

export const get_urls = createAsyncThunk(
    "url/geturls",
    async (username, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await urlService.getUrls(username);
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


const initialState = { urlsinfo: null };

const urlSlice = createSlice({
    name: "urlsinfo",
    initialState,
    extraReducers: {
        [get_urls.fulfilled]: (state, action) => {
            state.urlsinfo = action.payload;
        },
        [get_urls.rejected]: (state, action) => {
        },
    },
});

const { reducer } = urlSlice;
export default reducer;