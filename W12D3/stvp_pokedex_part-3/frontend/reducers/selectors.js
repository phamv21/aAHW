export const selectAllPokemon = (state) => {
  return Object.values(state.entities.pokemon)
}

export const selectSinglePokemon = (state) =>(pId)=>{
  return state.entities.pokemon[pId];
}

export const selectAllItems = (state)=>{
  return Object.values(state.entities.items)
}

export const getOnePokemon = (state) => (pId) =>{
  let result = state.entities.pokemon[pId];
  const {
    id,
    name,
    pokeType,
    imageUrl,
    attack,
    defense,
    moves
  } = result;

  return {
    id: id,
    name: name,
    poke_type: pokeType||'',
    image_url: imageUrl||'',
    attack: attack||0,
    defense:defense||0,
    move_names: moves === undefined ? [] : moves.map(el =>el.name)
  }

}