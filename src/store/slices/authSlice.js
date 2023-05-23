import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // user: null,
    user: { userId: 21, firstName: 'Job', lastName: 'Keow' },
};

// #1 createSlice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;

            if ((email === 'codecamp@mail.com', password === '1234')) {
                state.user = { userId: 21, firstName: 'Job', lastName: 'Keow' };
                localStorage.setItem('token', 'mock_token');
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

// #2 export action => use in UI
export const { login, logout } = authSlice.actions;

// #3 export reducer => use in store
export default authSlice.reducer;
