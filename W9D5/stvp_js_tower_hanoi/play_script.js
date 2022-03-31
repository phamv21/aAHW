const Game = require("./game")
//get the reader from the Game.
const reader = Game.reader;

function askContinue(callback) {
    reader.question("Do you want to continue play?",(res)=>{  
        return callback(res);
        
    })
}

function playGame(){
    let newGame = true;
    function loopstep(){
        if(!newGame){
            reader.close();
            return;
        }
        let game = new Game();
            game.run(()=>{
            console.log("you have won the game!");
            askContinue((res)=>{
                if(res==='yes'){
                    newGame = true;
                    loopstep();
                }
                if(res==='no'){
                    newGame = false;
                    loopstep();
                }
            });
        });
    
    }
    loopstep();

}

 playGame();

