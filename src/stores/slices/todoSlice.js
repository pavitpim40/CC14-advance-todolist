import { createSlice } from '@reduxjs/toolkit';

const initialTodo = {
    todos: [],
    todosFilter: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodo,
    reducers: {
        getTodo: () => {},
        addTodo: () => {},
        editTodo: () => {},
        deleteTodo: () => {},
        filterTodo: () => {},
        searchTodo: () => {},
    },
});

// ติดตั้งที่ configure Store
export default todoSlice.reducer;
