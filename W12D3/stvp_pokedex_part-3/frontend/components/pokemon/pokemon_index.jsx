import React from 'react';
import PokemonIndexItem from './pokemon_index_item';
import { Route, Switch } from "react-router-dom";
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';
import PokemonEditFormContainer from './pokemon_edit_form_container';
class PokemonIndex extends React.Component{
  constructor(props){
  super(props)
  }
  
  componentDidMount(){
  this.props.requestAllPokemon()
  }
  
  render(){
    let div;
  if(this.props.loading){
    div = <div id="loading-pokeball-container">
      <div id="loading-pokeball"></div>
    </div>
  }else{
    div = <section className="pokedex">

      <Route exact path='/' component={PokemonFormContainer} />
      <Switch>
        <Route exact path='/pokemon/:pokemonId/edit' component={PokemonEditFormContainer} />
        <Route path='/pokemon/:pokemonId' component={PokemonDetailContainer} />
        
      </Switch>
      

      <ul>
        {this.props.pokemon.map((poke) => (
          <PokemonIndexItem key={poke.id} poke={poke} />
        ))}
      </ul>
    </section>
  }
    return (
      <div>{div}</div>
    )
  }
  }
  
  
  
  export default PokemonIndex;