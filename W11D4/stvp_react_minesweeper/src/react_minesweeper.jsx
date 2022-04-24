import React from 'react';
import ReactDOM from 'react-dom/client'
import * as MineSweeper from './minesweeper';
import Game from './game'

document.addEventListener('DOMContentLoaded',()=>{
    let container = document.getElementById('root');
    let root = ReactDOM.createRoot(container);

    let Root = ()=>{
        return(
            <Game />
        )
    }
    
    root.render(Root());
})