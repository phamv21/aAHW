import { RECEIVE_POKEMON_ERRORS, CLEAR_POKEMON_ERRORS } from "../actions/pokemon_actions";

const errorsReducer = (state =[], action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_POKEMON_ERRORS:
            return action.errors
        case CLEAR_POKEMON_ERRORS:
            return [];
        default:
            return state;
    }
}
export default errorsReducer