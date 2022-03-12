function Elephant(name,heigh,tricks){
    this.name = name;
    this.heigh = heigh;
    this.tricks = tricks;
}


Elephant.prototype.trumpet = function(){
    console.log(this.name+" phrRRRRRRRRRRRR");
};

Elephant.prototype.grow = function(){
    this.heigh += 12;
};

Elephant.prototype.addTrick = function(trick){
    this.tricks.push(trick);
};

Elephant.prototype.play = function(){
    let length = this.tricks.length;
    let randomtrick = this.tricks[Math.floor(Math.random()*length)]
    console.log(`${this.name} is ${randomtrick}`)
};

// elephen1 = new Elephen('LA',12,['painting the picture','running the car','rolling the stone']);
// elephen1.trumpet();
// elephen1.play();
// elephen1.grow();
// elephen1.addTrick('kissing the ground');
// elephen1.play()

//Phase III
let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, charlie, kate, micah];


 Elephant.paradeHelper = function(elp){
console.log(`${elp.name} is trotting by!!!`) 
}

herd.forEach(Elephant.paradeHelper)

// Phase IV closures

function dinerBreakfast(food) {
    let menu = ['cheesy scramble egg'];
        return (food) => {
        menu.push(food);
        console.log(`I'd like some ${menu.join(' ')} please.`);
        }
}

let bfastOrder = dinerBreakfast(' ');
bfastOrder("chocolate chip pancakes");
bfastOrder("grits");