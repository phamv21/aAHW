export const fetchAllPokemon = () => {
  return $.ajax({
    method: "GET",
    url: "/api/pokemon"
  })
}
export const requestSinglePokemon = (pokeId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/pokemon/${pokeId}`
  })
}

export const createPokemon = (poke) =>{
  const {name,image_url,attack,defense,poke_type,move_names} = poke;
  let data = { pokemon: { name, image_url, attack, defense, poke_type, move_names}}

  return $.ajax({
    method: 'POST',
    headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
    url: '/api/pokemon',
    data: data
  })
}

export const updatePokemon = poke => {
  const { id,name, image_url, attack, defense, poke_type, move_names } = poke;
  let data = { pokemon: { name, image_url, attack, defense, poke_type, move_names } }

  return $.ajax({
    method: 'PATCH',
    headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
    url: `/api/pokemon/${id}`,
    data: data
  })
}

/// test

