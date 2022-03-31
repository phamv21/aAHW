// setup the prompt env
const { throws } = require('assert');
const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Game {
    constructor(){
        this.towers = [[1,2,3],[],[]];
    }


    run(completionCallback){
        //print the stacks
        let that = this;
       
        
        function loopstep(){
            that.print();
            if(that.isWon()){
                
                // reader.close();
                return completionCallback();
            }

            that.promptMove(function(idxs,idxe){
                if(that.move(idxs,idxe)){console.log("success")}else{console.log("unsucess move!")};
                loopstep();
            })

        }
        loopstep();
        //ask user for the move

        //loop until won

    }
    promptMove(callback){
        // print the stack
        // console.log(this.towers);
        // ask the user where to move the disk
        reader.question('which tower do you want to move from?',function(res1){
            reader.question('which tower do you want to move to?',function(res2){
                    let idx1 = parseInt(res1);
                    let idx2 = parseInt(res2);
                    callback(idx1,idx2);
            })
        })
        // pass startidx and end idx to the callback
    }

    isValidMove(startTowerIdx,endTowerIdx){
        ///check can we move it 
        if (this.towers[startTowerIdx][0] === undefined) { return false };
        if(this.towers[endTowerIdx][0]===undefined){return true};
        if(this.towers[startTowerIdx][0]<this.towers[endTowerIdx][0]){return true};
        return false;
    }

    move(startTowerIdx,endTowerIdx){
        if (this.isValidMove(startTowerIdx, endTowerIdx)){
            this.towers[endTowerIdx].unshift(this.towers[startTowerIdx].shift());
            return true;
        }
        return false;
        // }else{
            // return false;
        // }
    }
    print(){
        console.log(JSON.stringify(this.towers));
    }

    isWon(){
        return (this.towers[2].length === 3);
    }


}

// let game1 = new Game();
// game1.run(()=>{console.log('you won the game')});
// game1.print();
// console.log(game1.isWon());
// console.log(game1.print());
// console.log(game1.isValidMove(0,1));

// game1.promptMove((x,y)=>{console.log(`${x}and${y}`)});

module.exports = Game;
Game.reader = reader;