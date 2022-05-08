const selectAllPokemon = state =>{
    return Object.values(state.entities.pokemon)
}
export default selectAllPokemon;
window.selectAllPokemon = selectAllPokemon
