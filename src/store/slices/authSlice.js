import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: '',
};

// #1 createSlice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = '';
        },
    },
});

// #2 export action => use in UI
export const { logout } = authSlice.actions;

// #3 export reducer => use in store
export default authSlice.reducer;
