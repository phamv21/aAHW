import { RECEIVE_TODO, RECEIVE_TODOS,UPDATE_TODO, REMOVE_TODO} from "../actions/todo_actions";

const initialState = {};

export const todosReducer = (state =initialState,action) =>{
    Object.freeze(state)    
    switch(action.type){
        case RECEIVE_TODO:
            let nextState = Object.assign({},state);
            nextState[action.todo.id] = action.todo;
            return nextState;
        case RECEIVE_TODOS: 
             nextState = {};
             action.todos.map(el => nextState[el.id]= el)
             return nextState;
        case UPDATE_TODO:
            nextState = Object.assign({}, state);
            nextState[action.todo.id] = action.todo;
            return nextState;
        case REMOVE_TODO:
             nextState = Object.assign({}, state);
             delete nextState[action.todo.id]
            return nextState;
        default:
            return state;
    }
}
