//create 
//login
//logout

export const signUp = (newUser) =>{
    let data = {user:newUser}
    return $.ajax({
        method: 'POST',
        url: 'api/users',
        data: data
    })
}
export const signIn = (userInfo) =>{
    const {username,password} = userInfo;
    let data = {user:{username,password}}
    return $.ajax({
        method: 'POST',
        url: 'api/session',
        data:data
    })
}

export const logout = () =>{
    return $.ajax({
        method:'DELETE',
        url:'api/session'
    })
}