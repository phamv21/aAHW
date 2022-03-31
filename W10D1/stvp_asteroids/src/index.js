const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const GameView = require('./game_view.js');
const Game = require("./game.js");
window.MovingObject = MovingObject;
window.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');   
    const mo = new MovingObject({
        pos: [30, 30],
        vel: [10, 10],
        radius: 5,
        color: "#00FF00"
    });
    mo.move();
    mo.draw(canvasEl);
    const as = new Asteroid({pos:[80,80]});
    as.move();
    as.draw(canvasEl);

    const gv = new GameView(canvasEl);
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        gv.game.addAsteroids(gv.game.randomPosition()) 
    }
    gv.start();

});