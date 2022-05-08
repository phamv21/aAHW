import { receiveAllPokemon,fetchAllPokemon } from "../actions/pokemon_action";
import { RECEIVE_ALL_POKEMON } from "../actions/pokemon_action";

const pokemonReducer = (state ={}, action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ALL_POKEMON:
            return action.pokemon
        default:
            return state;
    }
}
export default pokemonReducer;