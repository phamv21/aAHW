import React from "react";

class Clock extends React.Component{
    constructor(props){
        super(props);
        //
        this.state ={
            date: new Date()
        };
        this.refreshTime = 0
        this.tick = this.tick.bind(this);
    }
    tick(){
        // let oldDate = this.state.date;
        // let newDate = oldDate.setSeconds(oldDate.getSeconds()+1);
        let newDate = new Date();
        this.setState({date: newDate});
    }
    componentDidMount(){
        this.refreshTime = setInterval(this.tick, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.refreshTime);
        this.refreshTime = 0;
    }



    render(){
        return (
            <div className="clock" >
                <h1>Clock</h1>
                <p > <span>Time:</span> <span>{this.state.date.getHours()}:{this.state.date.getMinutes()}:{this.state.date.getSeconds()}</span> </p>
                <p> <span>Date:</span> <span>{this.state.date.getMonth()}-{this.state.date.getDate()}-{this.state.date.getFullYear()}</span>  </p>
            </div>
        );
    };
}
export default Clock;