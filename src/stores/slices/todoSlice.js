import { createSlice } from '@reduxjs/toolkit';
import * as TodoServices from '../../services/todoServices';
import { act } from 'react-dom/test-utils';

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
        addTodo: (state, action) => {
            const newTodo = action.payload; // {id:..., task:..., status:...,due_date:..}
            state.todos.unshift(newTodo);
            state.todosFilter.unshift(newTodo);
        },
        editTodo: () => {},
        removeTodo: (state, action) => {
            const todoId = action.payload;
            state.todos = state.todos.filter((todo) => todo.id != todoId);
            state.todosFilter = state.todos.filter((todo) => todo.id != todoId);
        },
        filterTodo: () => {},
        searchTodo: () => {},
    },
});

// ติดตั้งที่ configure Store
export default todoSlice.reducer;

// ACTION CREATOR : Function ที่สร้าง Action Object = {type:"todo/blabla", payload:arg }
const { getTodo, addTodo, removeTodo } = todoSlice.actions;

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

export function createTodo(task) {
    // space

    return async (dispatch) => {
        try {
            const now = new Date().toISOString().slice(0, 10);
            const newTodo = { task: task, status: false, due_date: now };
            const response = await TodoServices.createTodo(newTodo);
            // console.log(response.data.todo); {id:..., task:..., status:...,due_date:..}
            dispatch(addTodo(response.data.todo));
        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteTodo(todoId) {
    return async (dispatch) => {
        try {
            await TodoServices.deleteTodo(todoId);
            // fetchTodo();
            dispatch(removeTodo(todoId));
        } catch (error) {
            console.log(error);
        }
    };
}
