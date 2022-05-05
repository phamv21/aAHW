export const fetchSteps = () =>{
    return $.ajax({
        method: 'GET',
        url: 'api/steps'
    })
}

export const createStep = (step) =>{
    return $.ajax({
        method: 'POST',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: 'api/steps',
        data: {step:step}
        
    })
}

export const patchStep = step =>{
    let data = ({title,description,done,todo_id}) => ({step:{title,description,done,todo_id}})
    return $.ajax({
        method: 'PATCH',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: `api/steps/${step.id}`,
        data: data(step),
    })
}

export const destroyStep = step =>{
    return $.ajax({
        method: 'DELETE',
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        url: `api/steps/${step.id}`,
    })
}