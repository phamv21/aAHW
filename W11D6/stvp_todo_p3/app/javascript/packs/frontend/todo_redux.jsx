import React from 'react';
import {createRoot} from 'react-dom/client';
import  ReactDOM  from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'
import {fetchTodos} from './util/todo_api_util'
document.addEventListener('DOMContentLoaded',()=>{
    let rootDiv = document.getElementById('root');

    const preloadedState = localStorage.state ?
        JSON.parse(localStorage.state) : {};

    // const store = configureStore(preloadedState);
    const store = configureStore({});
    let rootComponent = Root({store});

    ReactDOM.render(
        rootComponent,rootDiv
    )


    //testing
    window.store = store;
})


