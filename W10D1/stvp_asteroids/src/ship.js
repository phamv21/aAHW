const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');
const Util = require('./util.js');

function Ship() {
    let parameters = {};
    parameters.pos = [1280 * Math.random(), 800 * Math.random()];
    parameters.color = Ship.COLOR;
    parameters.radius = Ship.RADIUS;
    parameters.vel = [0,0];
    MovingObject.call(this, parameters)


}
Ship.COLOR = 'green';
Ship.RADIUS = 10;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
    this.pos = [1280 * Math.random(), 800 * Math.random()];
    this.vel =[0,0]
}
Ship.prototype.power = function(impulse){
    let thisShip = this;
   if(impulse === 'up'){
       thisShip.vel[1]--
   }
   if(impulse==='down'){
       thisShip.vel[1]++
   }
    if (impulse === 'left') { 
        thisShip.vel[0]--
    }
    if (impulse === 'right') { 
        thisShip.vel[0]++
    }
}
Ship.prototype.fire = function(){
    let thisShip = this;
   return new Bullet({
        pos: thisShip.pos,
        vel: thisShip.vel
    });
}

//
module.exports = Ship;