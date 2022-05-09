import PokemonIndexContainer from "./pokemon/pokemon_index_container";
import { Route } from "react-router-dom";
import React from "react";
import PokemonDetailContainer from "./pokemon/pokemon_detail_container";
import ItemDetail from "./pokemon/item_detail";
const App = ()=>(
    <div>
        <Route path='/' component={PokemonIndexContainer}></Route>
    </div>
    
)

export default App;