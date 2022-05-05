//export all todos in a array
 export const allTodos = (state) =>{
    return Object.values(state.todos)
}
export const steps = state =>todoId=>{
    return Object.values(state.steps).filter(step=>step['todo_id']===todoId)
}