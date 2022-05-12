import { RECEIVE_ALL_POKEMON,RECEIVE_SINGLE_POKEMON, LOADING_ALL_POKEMON, LOADING_SINGLE_POKEMON } from "../actions/pokemon_actions";

const loadingReducer = (state ={detailLoading:true, indexLoading:true}, action) =>{
    Object.freeze(state)
    switch(action.type){
        case LOADING_ALL_POKEMON:
            return { detailLoading: true, indexLoading: true };
        case LOADING_SINGLE_POKEMON:
            return { detailLoading: true, indexLoading: false };
        case RECEIVE_ALL_POKEMON:
            return { detailLoading: true, indexLoading: false}
        case RECEIVE_SINGLE_POKEMON:
            return { detailLoading: false, indexLoading: false }
        default:
            return state;
    }
}

export default loadingReducer;