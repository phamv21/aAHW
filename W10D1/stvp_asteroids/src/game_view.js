
const Game = require('./game.js');

function GameView(canvasEl) {
    this.game = new Game();
    this.ctx = canvasEl;
 };

GameView.prototype.start = function(){
    let that = this;
    this.bindKeyHandlers();
    setInterval(function () {
        that.game.steps();
        that.game.draw(that.ctx)
    },20)
}
GameView.prototype.bindKeyHandlers = function () {
    let thisGame = this;
    window.key('a', function (){thisGame.game.ship.power('left')});
    window.key('d', function (){thisGame.game.ship.power('right')});
    window.key('w', function (){thisGame.game.ship.power('up')});
    window.key('s', function (){thisGame.game.ship.power('down')});
    window.key('space', function () { thisGame.game.shipFire() });
}

//-> export
module.exports = GameView;
