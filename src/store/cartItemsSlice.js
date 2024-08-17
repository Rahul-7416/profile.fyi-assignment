import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cartItems');
        if (serializedState === null) {
            return { allItems: [], addedToCart: {} };
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load state from localStorage", e);
        return { allItems: [], addedToCart: {} };
    }
};

const initialState = loadStateFromLocalStorage();

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartItems', serializedState);
    } catch (e) {
        console.warn("Could not save state to localStorage", e);
    }
};

const CartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        modifyItems: (state, action) => {
            state.allItems = action.payload.allItems;
            state.addedToCart = {}; // Reset addedToCart

            // Populate addedToCart based on allItems
            state.allItems.forEach(item => {
                state.addedToCart[item.id] = true;
            });

            saveStateToLocalStorage(state);  // Save to localStorage
        },
        removeItem: (state, action) => {
            state.allItems = state.allItems.filter(item => item.id !== action.payload.itemId);
            delete state.addedToCart[action.payload.itemId];
            saveStateToLocalStorage(state);
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.allItems.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
            saveStateToLocalStorage(state);
        }
    }
});

export const { modifyItems, removeItem, updateQuantity } = CartItemsSlice.actions;

export default CartItemsSlice.reducer;
