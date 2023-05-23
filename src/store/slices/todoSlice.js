import { createSlice } from '@reduxjs/toolkit';
import * as TodoAPIServices from '../../services/todoServices';
import { getSevenDayRange } from '../../utils/DateUtils';

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
            const { todo } = action.payload;
            state.todosFilter = [todo, ...state.todosFilter];
        },
        editTodo: (state, action) => {},
        deleteTodo: (state, action) => {},
        selectList: (state, action) => {
            const { selectedIndex } = action.payload;
            const [today, nextSevenDay] = getSevenDayRange();
            if (selectedIndex === 0) state.todosFilter = state.todos;
            else if (selectedIndex === 1)
                state.todosFilter = state.todos.filter((todo) => todo.date === today);
            else if (selectedIndex === 2)
                state.todosFilter = state.todos.filter(
                    (todo) => todo.date >= today && todo.date <= nextSevenDay
                );
        },
        searchTodo: (state, action) => {
            const { searchValue } = action.payload;
            state.todosFilter = state.todos.filter((todo) =>
                todo.task.toLowerCase().includes(searchValue.toLowerCase())
            );
        },
    },
});

export const { addTodo, editTodo, deleteTodo, selectList, searchTodo, getAllTodo } =
    todoSlice.actions;

// Thunk Middleware
export const fetchAllTodo = () => {
    return async (dispatch) => {
        try {
            const response = await TodoAPIServices.getAllTodos();
            dispatch(getAllTodo({ todos: response.data.todos }));
        } catch (error) {
            console.log(error.response.status);
        }
    };
};

export const createTodo = ({ task }) => {
    return async (dispatch) => {
        const now = new Date().toISOString().slice(0, 10);
        const newTodoObj = { task: task, status: false, date: now };

        try {
            const response = await TodoAPIServices.createTodo(newTodoObj);
            const { todo } = response.data;
            dispatch(addTodo({ todo: todo }));
        } catch (error) {
            console.log(error.response.status);
        }
    };
};

export default todoSlice.reducer;
