// action.type : ประเภทความผิด
export const FETCH_TODO = 'FETCH_TODO';
export const ADD_TODO = 'ADD_TODO';

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

        default:
            return state;
    }
}

export default todoReducer;
