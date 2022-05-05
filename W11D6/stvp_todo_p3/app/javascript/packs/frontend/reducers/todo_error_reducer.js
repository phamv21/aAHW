import { CLEAR_TODO_ERROR,RECEIVE_TODO_ERROR } from "../actions/todo_error"; 

export const todoErrorReducer = (state=[],action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_TODO_ERROR:
            let newState = [...state,...action.err];
            return newState;
        case CLEAR_TODO_ERROR:
            return [];
        default:
            return state;
    };

}
