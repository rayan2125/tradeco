


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
};

const cartListingSlice = createSlice({
    name: "cartListing",
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cartList.push(action.payload);
        },
        removeCart: (state, action) => {
            state.cartList = state.cartList.filter(
                (Cart) => Cart.id !== action.payload
            );
        },
        removeAllCart: (state) => {

            state.cartList = [];
        },
    },
});

export const { addCart, removeCart, removeAllCart } = cartListingSlice.actions;

export default cartListingSlice.reducer;
