import React from 'react'
import * as MineSweeper from './minesweeper';

export default class Tile extends React.Component{
    constructor(props){
        super(props); //updateFn tileObject
        this.state ={};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.updateFn(this.props.tileObject,event.altKey);      
    }

    render(){
        let tile = this.props.tileObject;
        let statusClass = '';
        let tileValue = '';
        if (tile.explored && tile.adjacentBombCount() !== 0) { tileValue = tile.adjacentBombCount() }
        if (tile.explored && tile.bombed) { statusClass += 'bombed '; tileValue = ''};
        if(tile.flagged){statusClass+='flagged '}
        if(tile.explored){statusClass+= 'explored '}
        

        return(
            <div className={'tile'+" "+statusClass} onClick={this.handleClick}>
                {tileValue}
            </div>
        )
    }
}