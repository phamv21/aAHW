
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT_CURRENT_USER } from "../actions/session_actions";


const initialState = {session:[]}
const errorsReducer = (state=initialState,action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ERRORS:
            return {session:[...state.session,...action.errors]};
        case RECEIVE_CURRENT_USER:
            return initialState;
        case LOGOUT_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}

export default errorsReducer;