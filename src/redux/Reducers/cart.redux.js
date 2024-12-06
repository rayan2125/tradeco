import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
};

const cartListingSlice = createSlice({
    name: "cartListing",
    initialState,
    reducers: {
        addCart: (state, action) => {
            
            const existingItem = state.cartList.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartList.push(action.payload);
            }
        },
        removeCart: (state, action) => {
            state.cartList = state.cartList.filter(
                (Cart) => Cart.id !== action.payload
            );
        },
        removeAllCart: (state) => {
            state.cartList = [];
        },
        updateCartQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartList.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addCart, removeCart, removeAllCart, updateCartQuantity } = cartListingSlice.actions;

export default cartListingSlice.reducer;
