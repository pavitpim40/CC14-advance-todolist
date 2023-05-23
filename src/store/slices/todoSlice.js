import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todo: [],
    todoFilter: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // action = {type: ... , payload : {}}
        },
        editTodo: (state, action) => {},
        deleteTodo: (state, action) => {},
        selectList: (state, action) => {},
        searchTodo: (state, action) => {},
    },
});

export const { addTodo, editTodo, deleteTodo, selectList, searchTodo } = todoSlice.actions;

export default todoSlice.reducer;
