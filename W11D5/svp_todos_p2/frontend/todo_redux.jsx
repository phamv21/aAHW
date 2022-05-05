import React from 'react';
import {createRoot} from 'react-dom/client';
import configureStore from './store/store'
import Root from './components/root'
document.addEventListener('DOMContentLoaded',()=>{
    let rootDiv = document.getElementById('root');
    let root = createRoot(rootDiv);
    const preloadedState = localStorage.state ?
        JSON.parse(localStorage.state) : {};

    const store = configureStore(preloadedState);
    let rootComponent = Root({store});
    root.render(
        rootComponent
    )


    //testing
    window.store = store;
})


