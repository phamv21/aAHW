// Holds collections of the asteroids, bullets, and your ship.
//     Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
//         Game.prototype.draw(ctx) draws the game.
const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game(){
    this.asteroids = [];
    this.addAsteroids = this.addAsteroids.bind(this);
    this.ship = new Ship();
    this.bullets = [];
}
Game.DIM_X = 30;
Game.DIM_Y = 30;
Game.NUM_ASTEROIDS = 30;
Game.prototype.randomPosition =function(){
    return new Asteroid({pos: [1280*Math.random(),800*Math.random()]});
}
Game.prototype.addAsteroids = function(asteroid){
    this.asteroids.push(asteroid);
}

Game.prototype.allObjects = function(){
    let result = []
    
    result = result.concat(this.asteroids);
    result = result.concat(this.bullets);
    result.push(this.ship);
    return result;
}

Game.prototype.draw = function(canvasEl){
    ctx = canvasEl.getContext('2d');
    ctx.clearRect(0,0,1280,800);
    objects = this.allObjects();
    objects.forEach((el)= function(el){
        el.draw(canvasEl);
    })
}

Game.prototype.moveObjects = function(){
    let objects = this.allObjects();
    objects.forEach((el)=function(el){
        el.move();
    })
}

Game.prototype.checkCollisions = function(){
    //all the asteroids
    let thisGame = this
    let allAsteroids = thisGame.asteroids;
    let ship = thisGame.ship;
    let allBullets = thisGame.bullets;

    allAsteroids.forEach((a,idxa)=>{

        if(a.isCollidedWith(ship)){
            ship.relocate();
            // thisGame.remove(a,idx);
        }
        
        allBullets.forEach((b,idxb) => {
            if(b.isCollidedWith(a)){
                thisGame.remove(a,idxa);
                thisGame.remove(b,idxb);
            }
            if(b.pos[0]>1300 || b.pos[1]>1300){
                thisGame.remove(b, idxb);
            }
        })
    })
    
    
}

Game.prototype.steps = function(){
    this.moveObjects();
    this.checkCollisions();
}
Game.prototype.shipFire = function(){
    if (this.ship.vel[0] !== 0 || this.ship.vel[1] !== 0){
    this.bullets.push(this.ship.fire());
    
    }
}
Game.prototype.remove = function(obj,idx){
    if(obj instanceof Asteroid){
        this.asteroids.splice(idx,1);
    }
    if (obj instanceof Bullet){
        this.bullets.splice(idx,1);
    }
}


// Game.prototype.wrap =function(pos){
//     let x = pos[0];
//     let y = pos[1];
//     if(x > 1280){x = x-1280};
//     if(x < 0){x = x +1280};
//     if (y > 800) { y = y - 800 };
//     if (y < 0) { y = y + 800 }
//     return [x,y]
// }



module.exports = Game;