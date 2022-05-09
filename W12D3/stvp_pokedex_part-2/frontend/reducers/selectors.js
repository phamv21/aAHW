export const selectAllPokemon = (state) => {
  return Object.values(state.entities.pokemon)
}

export const selectSinglePokemon = (state) =>(pId)=>{
  return state.entities.pokemon[pId];
}

export const selectAllItems = (state)=>{
  return Object.values(state.entities.items)
}
