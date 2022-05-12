import { RECEIVE_CURRENT_USER,LOGOUT,CLEAR_SESSION_ERRORS,RECEVE_SESSION_ERRORS } from "../actions/session_action";

const sessionErrorReducer = (state =[], action) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEVE_SESSION_ERRORS:
            return [...state,...action.errors];
        case CLEAR_SESSION_ERRORS:
            return [];
        case RECEIVE_CURRENT_USER:
            return [];
        case LOGOUT:
            return [];
        default:
            return state;
    };
}
export default sessionErrorReducer;