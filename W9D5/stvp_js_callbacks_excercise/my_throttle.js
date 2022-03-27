

Function.prototype.myThrottle = function(interval){
    let tooSoon = false;
    //do nothing if it is to soon

        return (...args)=>{
            if(!tooSoon){
                tooSoon = true;
                setInterval(()=>tooSoon=false,interval);
                this(...args)
            }
        }
    

}

class Neuron {
    constructor(){
        this.fire = this.fire.myThrottle(4000);
    }
    fire() {
        console.log("Firing!");
    }
}

const neuron = new Neuron();
// When we create a new Neuron,
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
const interval = setInterval(() => {
    neuron.fire();
}, 10);

// neuron.fire = neuron.fire.myThrottle(500);

