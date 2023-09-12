import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import ProfileService from "../../services/profile.services";
import { setLoading } from "./loadingSlice";

export const upload_profile_picture = createAsyncThunk(
    "profile/upload",
    async (file, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ProfileService.uploadProfilePicture(file);
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

export const get_profile_info = createAsyncThunk(
    "profile/getprofile",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ProfileService.getProfileInfo();
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

export const update_bio_or_status = createAsyncThunk(
    "profile/update",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ProfileService.updateBioOrStatus(body);
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

const initialState = { profileInfo: null };

const ProfileSlice = createSlice({
    name: "profileInfo",
    initialState,
    extraReducers: {
        [get_profile_info.fulfilled]: (state, action) => {
            state.profileInfo = action.payload;
        },
        [get_profile_info.rejected]: (state, action) => {
        },
        [upload_profile_picture.fulfilled]: (state, action) => {
            state.profileInfo = action.payload;
        },
        [upload_profile_picture.rejected]: (state, action) => {
        },
        [get_profile_info.fulfilled]: (state, action) => {
            state.profileInfo = action.payload;
        },
        [get_profile_info.rejected]: (state, action) => {
        },
        [update_bio_or_status.fulfilled]: (state, action) => {
            state.profileInfo = action.payload;
        },
        [update_bio_or_status.rejected]: (state, action) => {
        },
    },
});

const { reducer } = ProfileSlice;
export default reducer;