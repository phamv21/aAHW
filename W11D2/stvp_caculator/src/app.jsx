import Calculator from "./caculator"; 
import React from 'react';
import ReactDOM from 'react-dom';


// const App =()=>{<Calculator></Calculator>}
document.addEventListener('DOMContentLoaded',()=>{
    const root = document.getElementById('root');
    ReactDOM.render(<Calculator></Calculator>,root);
});