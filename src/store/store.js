import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from './cartItemsSlice.js';
import authSlice from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        cartItems: cartItemsSlice, 
    }
});

export default store;