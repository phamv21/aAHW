// the internval practice

class Clock{
    constructor(){
        this.date = new Date();
        
        // this.hours = this.date.getHours();
        // this.minutes = this.date.getMinutes();
        // this.seconds = this.date.getSeconds();
        this.printTime();
        let that = this;
        setInterval(function(){that._tick()}, 1000);

    }

    printTime(){
        console.log(`Time is: ${this.date.toTimeString()}`)
    }

    _tick(){
        this.date.setSeconds((this.date.getSeconds()+1));
        this.printTime();
    }
}

// let clock = new Clock();


