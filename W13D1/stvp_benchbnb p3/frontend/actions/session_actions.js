import * as APIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECIEVE_ERRORS';

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})
export const receiveCurrentUser = (user) =>(
    {
        type:RECEIVE_CURRENT_USER,
        user
    }
)

export const logoutCurrentUser = () =>(
    {
        type:LOGOUT_CURRENT_USER,
    }
)

export const signup =(userInfo) => dispatch => {
   return APIUtil.signup(userInfo).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )
}

export const login = (userInfo) => dispatch =>{
    return APIUtil.login(userInfo).then(
        user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveErrors(errors.responseJSON))
    )

}

export const logout =() => dispatch =>{
    return APIUtil.logout().then(
        res => dispatch(logoutCurrentUser()),

    )
}


//test 

window.login = login;
window.logout = logout;