
export const signup = ({username,password}) =>{
    let data = {user:{username,password}};
    return $.ajax({
        url:'api/users',
        method: 'POST',
        data: data
    })
}

export const login = ({username,password}) =>{
    let data = {user:{username,password}};
    return $.ajax({
        url: 'api/session',
        method: "POST",
        data: data
    })

}
export const logout = () =>{
    return $.ajax({
        url: 'api/session',
        method: 'DELETE'
    })
}
