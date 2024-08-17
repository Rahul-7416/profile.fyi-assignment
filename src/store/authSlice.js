import { createSlice } from "@reduxjs/toolkit";

// Load the state from localStorage if it exists, otherwise use the default initial state
const initialState = {
    status: JSON.parse(localStorage.getItem('authStatus')) || false,
    userData: JSON.parse(localStorage.getItem('userData')) || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            // Save the state to localStorage
            localStorage.setItem('authStatus', JSON.stringify(state.status));
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            // Remove the state from localStorage
            localStorage.removeItem('authStatus');
            localStorage.removeItem('userData');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
