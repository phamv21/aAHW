import { RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON } from './../actions/pokemon_actions';


const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type){
  case RECEIVE_ALL_POKEMON:
    return Object.assign({},state, action.pokemon);
  case RECEIVE_SINGLE_POKEMON:
      let nextPoke = {}
      nextPoke[action.poke.pokemon.id] = action.poke.pokemon 
      return Object.assign({}, state,nextPoke)
  default:
    return state;
  }
}
  
export default pokemonReducer;
