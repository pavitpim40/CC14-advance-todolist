import { configureStore } from '@reduxjs/toolkit';
// import { todoSlice } from './slices/todoSlice';
import todoReducer from './slices/todoSlice';

export default configureStore({
    reducer: {
        todo: todoReducer,
    },
});
