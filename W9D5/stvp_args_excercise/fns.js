function sum1() {
    let args = Array.from(arguments);
    
    let sum = args.reduce((acc, el) => acc + el, 0);
    return sum;
}

function sum2(...arr){
    let sum = arr.reduce((acc, el) => acc + el, 0);
    return sum;
}


// console.log(sum1(1,2,3,5));
// console.log(sum2(1, 2, 3, 5));

Function.prototype.myBind1 = function(){
    let args = Array.from(arguments);
    let fnx = args[0];
    let bindTimeAgs = args.slice(1)
    let bindedFn = this;
    return function(){
        let callTimeArs = Array.from(arguments);
        return bindedFn.apply(fnx,bindTimeAgs.concat(callTimeArs))
    }
}

// bind 2
Function.prototype.myBind2 = function(fnx,...bindArgs){
    return(...callArgs)=>{
        return this.apply(fnx,bindArgs.concat(callArgs));
    }
}
/// test bind

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}
const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says.myBind2(pavlov, "meow", "Kush")();
// markov.says.myBind2(pavlov)("meow", "a tree");
// markov.says.myBind2(pavlov, "meow")("Markov");

//test bind last line


function curriedSum(num) {
    //sum is the number of argument
    let times = num;
    let args = [];

    function _curriedSum(el) {
        if(el !== undefined){args.push(el)}
        if (args.length === times) {
            return console.log(args.reduce((acc, el) => acc + el));
        }
        return _curriedSum;
    }
    return _curriedSum();
  
}

let sum = curriedSum(4);
sum(1)(1)(2)(3);

//


