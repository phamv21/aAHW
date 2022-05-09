import * as APIUtil from '../util/api_util';

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_SINGLE_POKEMON = 'RECEIVE_SINGLE_POKEMON'
export const CREATE_POKEMON = 'CREATE_POKEMON'
export const RECEIVE_POKEMON_ERRORS = 'RECEIVE_POKEMON_ERRORS'
export const CLEAR_POKEMON_ERRORS = 'CLEAR_POKEMON_ERRORS'
export const LOADING_ALL_POKEMON = 'LOADING_ALL_POKEMON';
export const LOADING_SINGLE_POKEMON = 'LOADING_SINGLE_POKEMON'

export const loadingALLPokemon = () =>({
  type: LOADING_ALL_POKEMON
})

export const loadingSinglePokemon = () => ({
  type: LOADING_SINGLE_POKEMON
})




export const receiveAllPokemon = (pokemon) => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})

export const receivePokemonErrors = errors =>({
  type: RECEIVE_POKEMON_ERRORS,
  errors
})

export const clearPokemonErrors = () =>({
  type: CLEAR_POKEMON_ERRORS
})

export const requestAllPokemon = () => (dispatch) => (
  APIUtil.fetchAllPokemon()
    .then(pokemon => {
      dispatch(clearPokemonErrors());
      return dispatch(receiveAllPokemon(pokemon))})
)

export const receiveSinglePokemon = (poke) =>({
  type: RECEIVE_SINGLE_POKEMON,
  poke
})

export const requestSinglePokemon = pokeId => dispatch => {
  dispatch(loadingSinglePokemon());
  return APIUtil.requestSinglePokemon(pokeId).then(
    poke => {
      dispatch(clearPokemonErrors());
      return dispatch(receiveSinglePokemon(poke))},
    err => dispatch(receivePokemonErrors(err.responseJSON))
     //remember error handle
  )
}



export const createPokemon = poke => dispatch => {
  return APIUtil.createPokemon(poke).then(
    pk => {
      dispatch(clearPokemonErrors());
      dispatch(receiveSinglePokemon(pk));
    return pk;
    },
    err => dispatch(receivePokemonErrors(err.responseJSON))
  )
}

////



//testing
window.requestSinglePokemon = requestSinglePokemon
window.createPokemon = createPokemon
window.receiveSinglePokemon = receiveSinglePokemon