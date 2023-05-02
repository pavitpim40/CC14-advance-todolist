import {  useEffect, createContext, useReducer } from 'react';
import * as TodoAPIServices from '../services/todoServices';
import todoReducer from '../reducers/todoReducer';
import { INIT_TODO } from '../reducers/todoReducer';
import { FETCH_TODO, ADD_TODO, EDIT_TODO, DELETE_TODO, SEARCH_TODO,SELECT_TODO_LIST } from '../reducers/todoReducer';
export const TodoContext = createContext();


function TodoContextProvider(props) {
  
    const [allTodoList, dispatch] = useReducer(todoReducer, INIT_TODO);
    
    // GET : FETCH
    async function fetchAllTodo() {
        try {
            const response = await TodoAPIServices.getAllTodos();
            dispatch({ type: FETCH_TODO, payload: { todos: response.data.todos } });
        } catch (error) {
            console.log(error.response.status);
        }
    }

    useEffect(() => {
        fetchAllTodo();
    }, []);

    // POST : Add
    const addTodo = async (task) => {
        try {
            // #1 Sync With External State/Service : Database
            const now = new Date().toISOString().slice(0, 10);
            const newTodoObj = { task: task, status: false, date: now };
            const response = await TodoAPIServices.createTodo(newTodoObj);
            // #2 Sync with Internal State : UI State
            dispatch({ type: ADD_TODO, payload: { newTodo: response.data.todo } });
        } catch (error) {
            // #3 Error Handler eg. modal Error, Sweat Alert
            console.log(error.response.data);
        }
    };

    // PUT : edit
    const editTodo = async (todoId, updateObj) => {
        try {
            const response = await TodoAPIServices.updateTodo(updateObj);
            dispatch({ type: EDIT_TODO, payload: { id: todoId, updatedTodo: response.data.todo } });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // DELETE : delete
    const deleteTodo = async (todoId) => {
        try {
            await TodoAPIServices.deleteTodo(todoId);
            dispatch({ type: DELETE_TODO, payload: { id: todoId } });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // FILTER BY LISTS
    const selectList = (selectedIndex) => dispatch({type:SELECT_TODO_LIST, payload : {selectedIndex}})
    

    // SEARCH TODO
    const searchTodo = (searchValue) =>
        dispatch({ type: SEARCH_TODO, payload: { searchText: searchValue } });

    return (
        <TodoContext.Provider
            value={{
                todos: allTodoList.todos,
                todosFilter: allTodoList.todosFilter,
                addTodo,
                editTodo,
                deleteTodo,
                selectList,
                searchTodo,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoContextProvider;

// Custom Hook
// export const useTodo = () => {
//     // Consumer
//     const sharedObj = useContext(TodoContext);
//     return sharedObj;

// };
