const View = require('./ttt-view.js')// require appropriate file
const Game = require("./game.js") // require appropriate file

  $(() => {
    // Your code here
    var $el = $('.ttt');
    var game = new Game();
    new View(game,$el);


    // View.prototype.setupBoard = function(){
      
    // }
    
  });
