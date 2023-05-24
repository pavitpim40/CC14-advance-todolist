import { createSlice } from '@reduxjs/toolkit';
import * as TodoServices from '../../services/todoServices';
import { getSevenDayRange } from '../../utils/DateUtils';

const initialTodo = {
    todos: [],
    todosFilter: [],
    loading: false,
    error: { message: '' },
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
        filterTodo: (state, action) => {
            const { selectedIndex } = action.payload;
            const [today, nextSevenDay] = getSevenDayRange();
            // today : "2023-05-24"
            // next : "2023-06-01"
            if (selectedIndex === 0) {
                state.todosFilter = state.todos;
            } else if (selectedIndex === 1) {
                state.todosFilter = state.todos.filter((todo) => todo.date === today);
            } else if (selectedIndex === 2) {
                state.todosFilter = state.todos.filter(
                    (todo) => todo.date >= today && todo.date <= nextSevenDay
                );
            }
        },
        searchTodo: (state, action) => {
            const { searchValue } = action.payload;

            state.todosFilter = state.todos.filter((todo) =>
                todo.task.toLowerCase().includes(searchValue.toLowerCase())
            );
        },
    },
});

// ติดตั้งที่ configure Store
export default todoSlice.reducer;

// ACTION CREATOR : Function ที่สร้าง Action Object = {type:"todo/blabla", payload:arg }
export const { getTodo, addTodo, removeTodo, searchTodo, filterTodo } = todoSlice.actions;

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
