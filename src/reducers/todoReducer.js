// action.type : ประเภทความผิด
export const FETCH_TODO = 'FETCH_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

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
        default:
            return state;
    }
}

export default todoReducer;
