import React from "react";
import { Provider } from "react-redux";
import PokemonIndexContainer from "./components/pokemon/pokemon_index_container";


const App =({store})=>(
    <Provider store={store}>
        <PokemonIndexContainer />
    </Provider>
)
export default App