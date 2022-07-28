import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT_CURRENT_USER } from "../actions/session_actions";

const initialState = {id:null}


const sessionReducer = (state=initialState,action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            return {id: parseInt(Object.keys(action.user))};
        case LOGOUT_CURRENT_USER:
            return {id:null}
        default:
            return state;
    }

}

export default sessionReducer;