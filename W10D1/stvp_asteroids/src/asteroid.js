//Asteroid (src/asteroid.js)
// Spacerock.It inherits from MovingObject.
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Util = require('./util.js');

function Asteroid(posParameters) {
    let parameters ={};
    parameters.pos = posParameters.pos;
    parameters.color = Asteroid.COLOR;
    parameters.radius = Asteroid.RADIUS;
    parameters.vel = Util.randomVec(10);
    MovingObject.call(this,parameters)

}
Asteroid.COLOR = 'red';
Asteroid.RADIUS = 20;
Util.inherits(Asteroid, MovingObject);
// => export
module.exports = Asteroid;


// Asteroid.prototype.isCollidedWith = function(otherObject){
//     if(otherObject.constructor === Ship){
//         let distance = Util.objectDistance(this.pos, otherObject.pos);
//         if(distance < (this.radius + otherObject.radius)){
//             otherObject.relocate();    
//             // return true
//         };
//     }
// }
