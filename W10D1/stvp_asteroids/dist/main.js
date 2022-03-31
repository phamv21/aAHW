/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("//Asteroid (src/asteroid.js)\n// Spacerock.It inherits from MovingObject.\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction Asteroid(posParameters) {\n    let parameters ={};\n    parameters.pos = posParameters.pos;\n    parameters.color = Asteroid.COLOR;\n    parameters.radius = Asteroid.RADIUS;\n    parameters.vel = Util.randomVec(10);\n    MovingObject.call(this,parameters)\n\n}\nAsteroid.COLOR = 'red';\nAsteroid.RADIUS = 20;\nUtil.inherits(Asteroid, MovingObject);\n// => export\nmodule.exports = Asteroid;\n\n\n// Asteroid.prototype.isCollidedWith = function(otherObject){\n//     if(otherObject.constructor === Ship){\n//         let distance = Util.objectDistance(this.pos, otherObject.pos);\n//         if(distance < (this.radius + otherObject.radius)){\n//             otherObject.relocate();    \n//             // return true\n//         };\n//     }\n// }\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Kill spacerocks with this.Also a MovingObject subclass.\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction Bullet(obx){\n    let parameters = {};\n    parameters.pos = obx.pos;\n    parameters.vel = obx.vel.map((el) => 10 * el);\n    parameters.color = Bullet.COLOR;\n    parameters.radius = Bullet.RADIUS;\n    MovingObject.call(this,parameters);\n}\nBullet.COLOR = 'black';\nBullet.RADIUS = 5;\nUtil.inherits(Bullet, MovingObject);\nBullet.prototype.move = function(){\n    let pos = this.pos;\n    let vel = this.vel;\n    let newPos = []\n    pos.forEach((el, idx) => newPos.push(el + vel[idx]));\n    this.pos =  newPos;\n\n}\n\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Holds collections of the asteroids, bullets, and your ship.\n//     Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.\n//         Game.prototype.draw(ctx) draws the game.\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game(){\n    this.asteroids = [];\n    this.addAsteroids = this.addAsteroids.bind(this);\n    this.ship = new Ship();\n    this.bullets = [];\n}\nGame.DIM_X = 30;\nGame.DIM_Y = 30;\nGame.NUM_ASTEROIDS = 30;\nGame.prototype.randomPosition =function(){\n    return new Asteroid({pos: [1280*Math.random(),800*Math.random()]});\n}\nGame.prototype.addAsteroids = function(asteroid){\n    this.asteroids.push(asteroid);\n}\n\nGame.prototype.allObjects = function(){\n    let result = []\n    \n    result = result.concat(this.asteroids);\n    result = result.concat(this.bullets);\n    result.push(this.ship);\n    return result;\n}\n\nGame.prototype.draw = function(canvasEl){\n    ctx = canvasEl.getContext('2d');\n    ctx.clearRect(0,0,1280,800);\n    objects = this.allObjects();\n    objects.forEach((el)= function(el){\n        el.draw(canvasEl);\n    })\n}\n\nGame.prototype.moveObjects = function(){\n    let objects = this.allObjects();\n    objects.forEach((el)=function(el){\n        el.move();\n    })\n}\n\nGame.prototype.checkCollisions = function(){\n    //all the asteroids\n    let thisGame = this\n    let allAsteroids = thisGame.asteroids;\n    let ship = thisGame.ship;\n    let allBullets = thisGame.bullets;\n\n    allAsteroids.forEach((a,idxa)=>{\n\n        if(a.isCollidedWith(ship)){\n            ship.relocate();\n            // thisGame.remove(a,idx);\n        }\n        \n        allBullets.forEach((b,idxb) => {\n            if(b.isCollidedWith(a)){\n                thisGame.remove(a,idxa);\n                thisGame.remove(b,idxb);\n            }\n            if(b.pos[0]>1300 || b.pos[1]>1300){\n                thisGame.remove(b, idxb);\n            }\n        })\n    })\n    \n    \n}\n\nGame.prototype.steps = function(){\n    this.moveObjects();\n    this.checkCollisions();\n}\nGame.prototype.shipFire = function(){\n    if (this.ship.vel[0] !== 0 || this.ship.vel[1] !== 0){\n    this.bullets.push(this.ship.fire());\n    \n    }\n}\nGame.prototype.remove = function(obj,idx){\n    if(obj instanceof Asteroid){\n        this.asteroids.splice(idx,1);\n    }\n    if (obj instanceof Bullet){\n        this.bullets.splice(idx,1);\n    }\n}\n\n\n// Game.prototype.wrap =function(pos){\n//     let x = pos[0];\n//     let y = pos[1];\n//     if(x > 1280){x = x-1280};\n//     if(x < 0){x = x +1280};\n//     if (y > 800) { y = y - 800 };\n//     if (y < 0) { y = y + 800 }\n//     return [x,y]\n// }\n\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nfunction GameView(canvasEl) {\n    this.game = new Game();\n    this.ctx = canvasEl;\n };\n\nGameView.prototype.start = function(){\n    let that = this;\n    this.bindKeyHandlers();\n    setInterval(function () {\n        that.game.steps();\n        that.game.draw(that.ctx)\n    },20)\n}\nGameView.prototype.bindKeyHandlers = function () {\n    let thisGame = this;\n    window.key('a', function (){thisGame.game.ship.power('left')});\n    window.key('d', function (){thisGame.game.ship.power('right')});\n    window.key('w', function (){thisGame.game.ship.power('up')});\n    window.key('s', function (){thisGame.game.ship.power('down')});\n    window.key('space', function () { thisGame.game.shipFire() });\n}\n\n//-> export\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nwindow.MovingObject = MovingObject;\nwindow.addEventListener('DOMContentLoaded', () => {\n    const canvasEl = document.getElementById('game-canvas');   \n    const mo = new MovingObject({\n        pos: [30, 30],\n        vel: [10, 10],\n        radius: 5,\n        color: \"#00FF00\"\n    });\n    mo.move();\n    mo.draw(canvasEl);\n    const as = new Asteroid({pos:[80,80]});\n    as.move();\n    as.draw(canvasEl);\n\n    const gv = new GameView(canvasEl);\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        gv.game.addAsteroids(gv.game.randomPosition()) \n    }\n    gv.start();\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("//Base class for anything that moves.\n// Most important methods are MovingObject.prototype.move, \n// MovingObject.prototype.draw(ctx), \n// MovingObject.prototype.isCollidedWith(otherMovingObject).\n// const Game = require('./game.js');\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction MovingObject(parametersObject){\n    // this.parameters = parametersObject;//pos: vel: radius: color:\n    this.pos =parametersObject.pos;\n    this.vel = parametersObject.vel;\n    this.radius = parametersObject.radius;\n    this.color = parametersObject.color\n}\n\nMovingObject.prototype.draw = function(canvasEl){\n    let pos = this.pos;\n    let vel = this.vel;\n    let radius = this.radius;\n    let color = this.color;\n    let ctx = canvasEl.getContext('2d');\n    ctx.beginPath();\n    ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI);\n    ctx.strokeStyle = color;\n    ctx.stroke();\n    ctx.fillStyle = color;\n    ctx.fill();\n}\nMovingObject.prototype.move = function(){\n    let pos = this.pos;\n    let vel = this.vel;\n    let newPos = []\n    pos.forEach((el,idx)=>newPos.push(el+vel[idx]));\n    this.pos = wrap(newPos);\n};\n\n//check collided\nMovingObject.prototype.isCollidedWith = function(otherObject){\n    let distance = Util.objectDistance(this.pos, otherObject.pos);\n    return (distance < (this.radius + otherObject.radius));\n}\n\n//->helper method\n\n\n\nwrap = function (pos) {\n    let x = pos[0];\n    let y = pos[1];\n    if (x > 1280) { x = x - 1280 };\n    if (x < 0) { x = x + 1280 };\n    if (y > 800) { y = y - 800 };\n    if (y < 0) { y = y + 800 }\n    return [x, y]\n}\n//<- helper method\n\n//export->\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction Ship() {\n    let parameters = {};\n    parameters.pos = [1280 * Math.random(), 800 * Math.random()];\n    parameters.color = Ship.COLOR;\n    parameters.radius = Ship.RADIUS;\n    parameters.vel = [0,0];\n    MovingObject.call(this, parameters)\n\n\n}\nShip.COLOR = 'green';\nShip.RADIUS = 10;\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function () {\n    this.pos = [1280 * Math.random(), 800 * Math.random()];\n    this.vel =[0,0]\n}\nShip.prototype.power = function(impulse){\n    let thisShip = this;\n   if(impulse === 'up'){\n       thisShip.vel[1]--\n   }\n   if(impulse==='down'){\n       thisShip.vel[1]++\n   }\n    if (impulse === 'left') { \n        thisShip.vel[0]--\n    }\n    if (impulse === 'right') { \n        thisShip.vel[0]++\n    }\n}\nShip.prototype.fire = function(){\n    let thisShip = this;\n   return new Bullet({\n        pos: thisShip.pos,\n        vel: thisShip.vel\n    });\n}\n\n//\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("//Utility code, especially vector math stuff.\n//inheritance fn\nFunction.prototype.inherits = function(parent){\n    this.prototype = Object.create(parent.prototype);\n    this.prototype.constructor = this;\n}\nconst Util = {\n    inherits:   function inherits(child,parent){\n                child.prototype = Object.create(parent.prototype);\n                child.prototype.constructor = child;\n                },\n    randomVec: function randomVec(length){\n                const deg = 2*Math.PI* Math.random()\n                return Util.scale([Math.sin(deg),Math.cos(deg)],length);\n                },\n    scale:      function scale(vec,m){\n                return [vec[0]*m, vec[1]*m];\n                },\nobjectDistance: function objectDistance(pos1, pos2) {\n                return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)\n                }\n\n}\n\n// -> export\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;