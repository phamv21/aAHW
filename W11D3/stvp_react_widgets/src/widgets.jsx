import Tabs from './tabs';
import Clock from './clock';
import Weather from './weather';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete';


let tabsInfo = [
    {title:'one',content:'Fun Content'},
    {title: 'two', content:'Love content'},
    {title: 'three',content: 'Style is King'},
    { title: 'four', content: 'OMG is King' }
]

let nameList =[
    'Aline',
    'Bina',
    'Cina',
    'Dopeine',
    'Ethrine',
    'Fopth',
    'Gothe',
    'Kim',
    'Line',
    'Moie',
    'Nipe',
    'Xine'
]
const Root =() =>{
    return(
        <div>
            <Clock />
            < AutoComplete list={nameList} />
            <Weather />
            <Tabs info={tabsInfo} />
            
        </div>
    )
};

// const App =()=>{<Calculator></Calculator>}
document.addEventListener('DOMContentLoaded',()=>{
    const root = document.getElementById('root');
    ReactDOM.render( <Root></Root>
    ,root);
});