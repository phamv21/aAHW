export const RECEIVE_TODO_ERROR = 'RECEIVE_TODO_ERROR';
export const CLEAR_TODO_ERROR = 'CLEAR_TODO_ERROR'

export const receiveTodoError = (err)=>({
    type: RECEIVE_TODO_ERROR,
    err
})


export const clearTodoError = () => ({
    type: CLEAR_TODO_ERROR,

})