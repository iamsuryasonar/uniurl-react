import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import GalleryService from "../../services/gallery.services";
import { setLoading } from "./loadingSlice";
import { logout } from "./authSlice";

export const upload_gallery_image = createAsyncThunk(
    "gallery_image/upload",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await GalleryService.uploadGalleryImage(data);
            thunkAPI.dispatch(get_gallery_images());
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

export const get_gallery_images = createAsyncThunk(
    "gallery_images/get_images",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await GalleryService.getGalleryImages();
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

export const delete_image = createAsyncThunk(
    "gallery_images/delete_image",
    async (id, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await GalleryService.deleteImage(id);
            thunkAPI.dispatch(get_gallery_images());
            return response?.data;
        } catch (error) {
            console.log(error)
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



const initialState = { galleryImages: null };

const GalleryImagesSlice = createSlice({
    name: "galleryImages",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(get_gallery_images.fulfilled, (state, action) => {
            state.galleryImages = action.payload;
        }).addCase(get_gallery_images.rejected, (state, action) => {
        }).addCase(upload_gallery_image.fulfilled, (state, action) => {
        }).addCase(upload_gallery_image.rejected, (state, action) => {
        }).addCase(delete_image.fulfilled, (state, action) => {
        }).addCase(delete_image.rejected, (state, action) => {
        })
    }
});

export const galleryImagesState = (state) => state.galleryImages.galleryImages;

const { reducer } = GalleryImagesSlice;
export default reducer;
