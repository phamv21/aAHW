//Utility code, especially vector math stuff.
//inheritance fn
Function.prototype.inherits = function(parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}
const Util = {
    inherits:   function inherits(child,parent){
                child.prototype = Object.create(parent.prototype);
                child.prototype.constructor = child;
                },
    randomVec: function randomVec(length){
                const deg = 2*Math.PI* Math.random()
                return Util.scale([Math.sin(deg),Math.cos(deg)],length);
                },
    scale:      function scale(vec,m){
                return [vec[0]*m, vec[1]*m];
                },
objectDistance: function objectDistance(pos1, pos2) {
                return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
                }

}

// -> export
module.exports = Util;