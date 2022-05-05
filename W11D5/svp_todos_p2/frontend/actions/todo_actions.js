// there are two recieveTodos and recieveTodo


export const RECEIVE_TODO = 'RECEIVE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
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
export const removeTodo =(id) =>{
    return {
        type: REMOVE_TODO,
        id
    }
}


// tesing
window.receiveTodo = receiveTodo;
window.receiveTodos = receiveTodos;
window.removeTodo = removeTodo;