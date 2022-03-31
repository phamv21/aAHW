// using the Object.create
Function.prototype.inherits = function(parent){
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}
//test
function Animal(name) {
    this.name = name;
    this.gender = 'male';
}

Animal.prototype.run = function () {
    console.log(`${this.name} run run`);
}
Animal.prototype.revealGender = function () {
    console.log(this.gender);
}
function Dog(name) {
    this.name = name;
}
Dog.inherits(Animal);
Dog.prototype.woof = function () {
    console.log(`${this.name} woof woof`)
}

let d1 = new Dog('tifani');
let a1 = new Animal('cat');
// d1.woof();
d1.run();
d1.woof();
d1.gender = 'female';