import React from 'react'
import * as MineSweeper from './minesweeper';
import Tile from './tile';

export default class Board extends React.Component {
    constructor(props){
        super(props); // board and updateFn
        this.state ={};
    }


    render(){
        let boardData = this.props.board.grid;
        let Fn = this.props.updateFn;
        let board = boardData.map((row,rIdx)=>(
            <ul key ={rIdx}>
                {row.map((tile,tIdx)=>(
                    <li key={rIdx+'-'+tIdx}>
                        <Tile tileObject={tile} updateFn={Fn}/>
                    </li>
                ))}
            </ul>
        ))
        
        return(
            <div className='board'>
                <h1>Board</h1>
                {board}
            </div>
        )

    }
}