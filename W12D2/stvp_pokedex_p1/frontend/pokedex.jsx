import React from "react";
import ReactDOM from "react-dom";
import {fetchAllPokemon} from './actions/pokemon_action'
import configureStore from './store/store'
import App from './app'

import selectAllPokemon from './reducers/selector'
document.addEventListener('DOMContentLoaded',()=>{
    const store = configureStore();
    let root = document.getElementById('root');
    ReactDOM.render(<App store={store}/>,root)
    // test only
    window.store = store;
})