import * as APIUtil from '../util/api_util'

export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

export const receiveAllPokemon = (pokemon) =>({
    type: RECEIVE_ALL_POKEMON,
    pokemon

})

export const fetchAllPokemon = dispatch =>{
    return APIUtil.fetchAllPokemon().then(
        pokemon => dispatch(receiveAllPokemon(pokemon)),
        //remember error handleer
    )
}


//testing

window.fetchAllPokemon = fetchAllPokemon