import React from "react";
import ReactDOM from 'react-dom'
import * as API from './util/session_api_util'
import configureStore from './store/store'
import Root from './components/root'
import {fetchBenches} from './actions/bench_actions'


import {receiveHighlight} from './actions/highlight_actions'
document.addEventListener('DOMContentLoaded',()=>{
    let preLoadedState = {}
    if (window.currentUser !== undefined){
        preLoadedState = {
            entities: {users:currentUser},
            session: {id:parseInt(Object.keys(currentUser)[0])}

        }
    }
    const store = configureStore(preLoadedState);
    window.store = store
    window.fetchBenches = fetchBenches
    let root = document.getElementById('root');
    ReactDOM.render(<Root store ={store}/>,root)

//
window.receiveHighlight = receiveHighlight
})