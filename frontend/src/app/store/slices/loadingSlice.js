import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const loadingState = (state) => state.loading;

const { reducer, actions } = loadingSlice;

export const { setLoading } = actions
export default reducer;