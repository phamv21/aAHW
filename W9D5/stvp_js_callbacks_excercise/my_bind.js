Function.prototype.myBind = function(context){
    // let that = this;
 return() => this.apply(context);
}




class Lamb{
    constructor(){
        this.name = 'a lamb'
    }
}

const turnOn = function(){
    console.log(`Turn on this ${this.name}`);
}

const lamb = new Lamb;
const myBoundTurnOn = turnOn.myBind(lamb);

myBoundTurnOn();
