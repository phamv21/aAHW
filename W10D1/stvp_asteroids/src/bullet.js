// Kill spacerocks with this.Also a MovingObject subclass.

const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

function Bullet(obx){
    let parameters = {};
    parameters.pos = obx.pos;
    parameters.vel = obx.vel.map((el) => 10 * el);
    parameters.color = Bullet.COLOR;
    parameters.radius = Bullet.RADIUS;
    MovingObject.call(this,parameters);
}
Bullet.COLOR = 'black';
Bullet.RADIUS = 5;
Util.inherits(Bullet, MovingObject);
Bullet.prototype.move = function(){
    let pos = this.pos;
    let vel = this.vel;
    let newPos = []
    pos.forEach((el, idx) => newPos.push(el + vel[idx]));
    this.pos =  newPos;

}


module.exports = Bullet;
