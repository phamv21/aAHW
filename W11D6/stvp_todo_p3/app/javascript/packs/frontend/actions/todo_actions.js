// there are two recieveTodos and recieveTodo
import * as APIUtil from '../util/todo_api_util'
import { receiveTodoError, clearTodoError } from './todo_error';

export const RECEIVE_TODO = 'RECEIVE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO';


export const receiveTodo=(todo)=>{
    return {
        type: RECEIVE_TODO,
        todo
    }
};

export const receiveTodos =(todos) =>{
    return {
        type: RECEIVE_TODOS,
        todos
    }
}
export const removeTodo =(todo) =>{
    return {
        type: REMOVE_TODO,
        todo
    }
}

export const updateTodo = todo => {
    return {
        type: UPDATE_TODO,
        todo
    }
}



export const fetchTodos = ()=> dispatch=>{
    return APIUtil.fetchTodos().then(
        todos =>dispatch(receiveTodos(todos)))
}

export const createTodo = (todo) =>dispatch=>{
    
    return APIUtil.createTodo(todo).then(
        todo => {
            dispatch(clearTodoError());
            return dispatch(receiveTodo(todo))},
        err => dispatch(receiveTodoError(err.responseJSON))
    )
}
export const destroyTodo = (todo) => dispatch =>{
    return APIUtil.destroyTodo(todo).then(
        todo => {
            dispatch(clearTodoError());
            return dispatch(removeTodo(todo))},
        err => dispatch(receiveTodoError(err.responseJSON))
    )
}
export const patchTodo = todo => dispatch => {
        return APIUtil.patchTodo(todo).then(
            todo => {
                dispatch(clearTodoError());
                return dispatch(updateTodo(todo))},
            err => dispatch(receiveTodoError(err.resonseJSON))
        ) 
}

// tesing
window.receiveTodo = receiveTodo;
window.receiveTodos = receiveTodos;
window.removeTodo = removeTodo;
window.fetchTodos = fetchTodos