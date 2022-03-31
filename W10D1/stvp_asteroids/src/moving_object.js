//Base class for anything that moves.
// Most important methods are MovingObject.prototype.move, 
// MovingObject.prototype.draw(ctx), 
// MovingObject.prototype.isCollidedWith(otherMovingObject).
// const Game = require('./game.js');
const Util = require('./util.js');

function MovingObject(parametersObject){
    // this.parameters = parametersObject;//pos: vel: radius: color:
    this.pos =parametersObject.pos;
    this.vel = parametersObject.vel;
    this.radius = parametersObject.radius;
    this.color = parametersObject.color
}

MovingObject.prototype.draw = function(canvasEl){
    let pos = this.pos;
    let vel = this.vel;
    let radius = this.radius;
    let color = this.color;
    let ctx = canvasEl.getContext('2d');
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}
MovingObject.prototype.move = function(){
    let pos = this.pos;
    let vel = this.vel;
    let newPos = []
    pos.forEach((el,idx)=>newPos.push(el+vel[idx]));
    this.pos = wrap(newPos);
};

//check collided
MovingObject.prototype.isCollidedWith = function(otherObject){
    let distance = Util.objectDistance(this.pos, otherObject.pos);
    return (distance < (this.radius + otherObject.radius));
}

//->helper method



wrap = function (pos) {
    let x = pos[0];
    let y = pos[1];
    if (x > 1280) { x = x - 1280 };
    if (x < 0) { x = x + 1280 };
    if (y > 800) { y = y - 800 };
    if (y < 0) { y = y + 800 }
    return [x, y]
}
//<- helper method

//export->

module.exports = MovingObject;