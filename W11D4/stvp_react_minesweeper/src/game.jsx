import React from 'react';
import * as MineSweeper from './minesweeper';
import Board from './board';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            board: new MineSweeper.Board(10,10),
            status: '',
            message: ''

        };
        this.updateGame = this.updateGame.bind(this);
        this.newGame = this.newGame.bind(this)
    }
    updateGame(tile,action){ //action true: flagg - flase - reveal
        if(action){
            tile.toggleFlag();
        }
        if(!action){
            tile.explore();
        }

        this.setState({board: this.state.board});
        if(this.state.board.won()){
            this.setState({status:'finished',message:'you have won!'})
        }
        if(this.state.board.lost()){
            this.setState({ status: 'finished', message: 'you have lost!' })
        }
    }
    newGame(event){
        event.preventDefault();
        this.setState({
            board: new MineSweeper.Board(10, 10),
            status: '',
            message: ''
        })
    }
    

    render(){
        
        return(
            <div className='game'>
                <h1>Minesweeper</h1>
                <p>Click to explore a tile.
                    Alt + click to flag a tile.</p>
                <Board board={this.state.board} updateFn={this.updateGame} />
                <div className={'gameover'+" " +this.state.status}>
                    <form>
                        <p>{this.state.message}</p>
                        <button onClick={this.newGame}> New Game</button>
                    </form>
                    
                </div>
            </div>
        )
    }

}