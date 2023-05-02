import { getSevenDayRange } from '../utils/DateUtils';
// action.type : ประเภทความผิด
export const FETCH_TODO = 'FETCH_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SEARCH_TODO = 'SEARCH_TODO';
export const SELECT_TODO_LIST = 'SELECT_TODO_LIST';

// init state : คะแนนตั้งต้น
export const INIT_TODO = {
    todos: [],
    todosFilter: [],
};

// ครูเต้
// action = {type: ทำอะไรผิดมาไอ้หนู , payload : ต้องทำอะไรกับตะแนนเจ้าเด็กนี่ต่อ}
function todoReducer(state, action) {
    switch (action.type) {
        case FETCH_TODO:
            return {
                todos: action.payload.todos,
                todosFilter: action.payload.todos,
            };
        case ADD_TODO:
            const newTodoList = [action.payload.newTodo, ...state.todos];
            return {
                todos: newTodoList,
                todosFilter: newTodoList,
            };
        case EDIT_TODO:
            const { id, updatedTodo } = action.payload;
            const foundedIndex = state.todos.findIndex((todo) => todo.id === id);
            if (foundedIndex === -1) return state;
            const updatedTodoList = [...state.todos];
            updatedTodoList[foundedIndex] = Object.assign(
                {},
                updatedTodoList[foundedIndex],
                updatedTodo
            );
            return {
                todos: updatedTodoList,
                todosFilter: updatedTodoList,
            };
        case DELETE_TODO:
            const { id: deleltedId } = action.payload;
            const restTodoList = [...state.todos].filter((todo) => todo.id !== deleltedId);
            return {
                todos: restTodoList,
                todosFilter: restTodoList,
            };
        case SEARCH_TODO:
            const searchTodoList = [...state.todos].filter((todo) =>
                todo.task.toLowerCase().includes(action.payload.searchText.toLowerCase())
            );
            return {
                todos: [...state.todos],
                todosFilter: searchTodoList,
            };
        case SELECT_TODO_LIST:
            const [today, nextSevenDay] = getSevenDayRange();
            const { selectedIndex } = action.payload;
            if (selectedIndex === 0) {
                return { todos: state.todos, todosFilter: state.todos };
            } else if (selectedIndex === 1) {
                const todayList = [...state.todos].filter((todo) => todo.date === today);
                return { todos: state.todos, todosFilter: todayList };
            } else if (selectedIndex === 2) {
                const sevenDayList = [...state.todos].filter(
                    (todo) => todo.date >= today && todo.date <= nextSevenDay
                );
                return { todos: state.todos, todosFilter: sevenDayList };
            } else {
                return state;
            }
        default:
            return state;
    }
}

export default todoReducer;
