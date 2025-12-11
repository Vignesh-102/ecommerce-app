import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./cartTypes";

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<CartItem>) {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id && i.category === item.category);

            if (existing) {
                existing.quantity += item.quantity;
            } else {
                state.items.push(item);
            }
        },
        removeItemFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },

    }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;