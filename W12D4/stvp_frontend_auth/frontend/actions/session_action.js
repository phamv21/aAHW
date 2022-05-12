export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT = 'LOGOUT';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERROR';
export const RECEVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERROR';

import * as APIUtil from '../utils/session_util'
export const receiveCurrentUser = (currentUser) =>(
    {
        type: RECEIVE_CURRENT_USER,
        currentUser
    }
);
export const logout = () => (
    {type: LOGOUT}
)

export const receiveSessionErrors = (errors) =>({
    type: RECEVE_SESSION_ERRORS,
    errors
})
export const clearSessionErrors = () => (
    {
        type: CLEAR_SESSION_ERRORS,
    }
)

export const signUp = newUser => dispatch =>{
    APIUtil.signUp(newUser).then(
        user => {
             dispatch(receiveCurrentUser(user));
             return user;
        },
        err => dispatch(receiveSessionErrors(err.responseJSON))
    )
}

export const signIn = userInfo => dispatch => {
    APIUtil.signIn(userInfo).then(
        user => {
             dispatch(receiveCurrentUser(user));
             return user;
        },
        err => dispatch(receiveSessionErrors(err.responseJSON))
    )
}
export const logoutUser = () => dispatch =>{
    APIUtil.logout().then(() =>dispatch(logout())

    )
}