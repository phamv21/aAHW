import React from "react";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        // your code here
        this.state = {
            input1: "",
            input2: "",
            result: 0,
            method: ''
        }
        this.updateInput1 = this.updateInput1.bind(this);
        this.updateInput2 = this.updateInput2.bind(this);
        this.updateResult = this.updateResult.bind(this);
        this.reset = this.reset.bind(this);
    }
    updateInput1(event){
        this.setState({input1: event.currentTarget.value},()=>{
            console.log(this.state.input1);
        });
        
    }
    updateInput2(event){ 
        this.setState({ input2: event.currentTarget.value },()=>{
            console.log(this.state.input2);
        });

        

    }
    updateResult(event){
        let method = event.currentTarget.value;
        let i1 = parseInt(this.state.input1);
        let i2 = parseInt(this.state.input2);
        switch(method){
            case '+':
                this.setState({result: i1 + i2,method:'+'});
                break;
            case '-':
                this.setState({ result: i1 - i2, method: '-'});
                break;
            case '*':
                this.setState({ result: i1 * i2, method: '*' });
                break;
            case '/':
                this.setState({ result: i1 / i2, method: '/' });
                break;
        }
    
    }
    reset(event){
        this.setState({input1:'',input2:'',method:'',result:0});
    }

    // your code here

    render() {
        return (
            <div>
                <h1> {this.state.input1} {this.state.method} {this.state.input2} = {this.state.result}</h1>
                <input type='text' onChange={this.updateInput1} value={this.state.input1} />
                <span> the Inpput1 is: {this.state.input1}</span>
                <br />
                <input type='text' onChange={this.updateInput2} value={this.state.input2} />
                <span> the Inpput2 is: {this.state.input2}</span>
                <button onClick={this.reset} >Clear</button>
                <br />
                <button value="+" onClick={this.updateResult}> Add</button>
                <button value="-" onClick={this.updateResult}> Minus</button>
                <button value="*" onClick={this.updateResult}> Multiply</button>
                <button value="/" onClick={this.updateResult}> Divide</button>
            </div>
        );
    }
}

export default Calculator;