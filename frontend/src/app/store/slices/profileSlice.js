import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import ProfileService from "../../services/profile.services";
import { setLoading } from "./loadingSlice";
import { logout } from "./authSlice";

export const upload_profile_picture = createAsyncThunk(
    "profile/upload",
    async (file, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ProfileService.uploadProfilePicture(file);
            thunkAPI.dispatch(get_profile_info());
            return response?.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response.status === 401) {
                thunkAPI.dispatch(logout());
            }
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
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response.status === 401) {
                thunkAPI.dispatch(logout());
            }
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


export const update_profile_info = createAsyncThunk(
    "profile/update",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await ProfileService.updateProfileInfo(body);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response.status === 401) {
                thunkAPI.dispatch(logout());
            }
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
    extraReducers: (builder) => {
        builder.addCase(get_profile_info.fulfilled, (state, action) => {
            state.profileInfo = action.payload;
        }).addCase(get_profile_info.rejected, (state, action) => {
        }).addCase(upload_profile_picture.fulfilled, (state, action) => {
            state.profileInfo = action.payload;
        }).addCase(upload_profile_picture.rejected, (state, action) => {
        }).addCase(update_profile_info.fulfilled, (state, action) => {
            state.profileInfo = action.payload;
        }).addCase(update_profile_info.rejected, (state, action) => {
        })
    }
});

export const profileState = (state) => state.profile.profileInfo;

const { reducer } = ProfileSlice;
export default reducer;
