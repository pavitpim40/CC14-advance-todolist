import { createSlice } from '@reduxjs/toolkit';
import * as TodoServices from '../../services/todoServices';

const initialTodo = {
    todos: [],
    todosFilter: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodo,
    reducers: {
        getTodo: (state, action) => {
            const { todos } = action.payload;
            console.log(todos);
            state.todos = todos;
            state.todosFilter = todos;
        },
        addTodo: () => {},
        editTodo: () => {},
        deleteTodo: () => {},
        filterTodo: () => {},
        searchTodo: () => {},
    },
});

// ติดตั้งที่ configure Store
export default todoSlice.reducer;

// ACTION CREATOR : Function ที่สร้าง Action Object = {type:"todo/blabla", payload:arg }
const { getTodo } = todoSlice.actions;

// ################################################
// Async Task
export function fetchTodo() {
    return async (dispatch) => {
        try {
            const response = await TodoServices.getAllTodos();
            // dispatch : for update store
            dispatch(getTodo({ todos: response.data.todos }));
        } catch (error) {
            console.log(error);
        }
    };
}
