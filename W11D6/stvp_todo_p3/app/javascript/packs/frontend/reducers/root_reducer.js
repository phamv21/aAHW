import {combineReducers} from 'redux'
import { todosReducer } from "./todos_reducer";
import { todoErrorReducer } from './todo_error_reducer';
import stepsReducer from './steps_reducer';

const rootReducer = combineReducers({
    todos: todosReducer,
    steps: stepsReducer,
    errors: todoErrorReducer
}); 
export default rootReducer;