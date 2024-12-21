import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        closeMenu: (state) => {
            return { value: false }
        },
        toggleMenu: (state) => {
            return { value: !state.value }
        }
    }
});

export const menuState = (state) => state.menu;

const { reducer, actions } = menuSlice;

export const { closeMenu, toggleMenu } = actions
export default reducer;