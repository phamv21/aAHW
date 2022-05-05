
export const fetchTodos = () =>{
    // let sucess = (respn) => console.log(respn);
    return $.ajax({
        method: "get",
        url: 'api/todos',
    })

}

export const createTodo = (todo) =>{
    let data = ({ title, body, done, tag_names }) => ({ todo: { title,body,done,tag_names}})
    return $.ajax({
        method: 'POST',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: 'api/todos',
        data: data(todo)
        
    })
}

export const destroyTodo = (todo) =>{
    return $.ajax({
        method: 'DELETE',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: `api/todos/${todo.id}`
    })
}

export const patchTodo = (todo) => {
    let data =({title,body,done}) =>({todo:{title,body,done}})
    let id = todo.id;
    return $.ajax({
        method: 'PATCH',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: `api/todos/${id}`,
        data: data(todo),
    })
}

// test 
window.fetchTodos = fetchTodos