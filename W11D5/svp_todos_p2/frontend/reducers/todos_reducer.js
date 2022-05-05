import { RECEIVE_TODO, RECEIVE_TODOS, REMOVE_TODO} from "../actions/todo_actions";

const initialState = {
    1: {
        id: 1,
        title: "wash car",
        body: "with soap",
        done: false
    },
    2: {
        id: 2,
        title: "wash dog",
        body: "with shampoo",
        done: true
    }
};

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
        case REMOVE_TODO:
             nextState = Object.assign({}, state);
             delete nextState[action.id]
            return nextState;
        default:
            return state;
    }
}
