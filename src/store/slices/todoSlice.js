import { createSlice } from '@reduxjs/toolkit';
import * as TodoAPIServices from '../../services/todoServices';

const initialState = {
    todos: [],
    todosFilter: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getAllTodo: (state, action) => {
            state.todos = action.payload.todos;
            state.todosFilter = action.payload.todos;
        },
        addTodo: (state, action) => {
            // action = {type: ... , payload : {}}
        },
        editTodo: (state, action) => {},
        deleteTodo: (state, action) => {},
        selectList: (state, action) => {},
        searchTodo: (state, action) => {},
    },
});

export const { addTodo, editTodo, deleteTodo, selectList, searchTodo, getAllTodo } =
    todoSlice.actions;

export default todoSlice.reducer;

// Thunk Middleware
export const fetchAllTodo = () => {
    console.log('hi');
    return async (dispatch) => {
        try {
            const response = await TodoAPIServices.getAllTodos();
            dispatch(getAllTodo({ todos: response.data.todos }));
        } catch (error) {
            console.log(error.response.status);
        }
    };
};
