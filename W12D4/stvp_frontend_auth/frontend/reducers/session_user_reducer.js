import { RECEIVE_CURRENT_USER,LOGOUT } from "../actions/session_action";

const sessionUserReducer = (state ={}, action) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_CURRENT_USER:
            return Object.assign({},action.currentUser)
        case LOGOUT:
            return {};
        default:
            return state
    };
}

export default sessionUserReducer;