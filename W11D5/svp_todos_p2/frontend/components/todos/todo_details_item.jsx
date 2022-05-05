import React from "react";
export default class DetailsItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status: this.getStatus()
        };

        this.toggle = this.toggle.bind(this);
        this.removeStep = this.removeStep.bind(this);

    }

    getStatus(){
        if(this.props.step.done){return 'Undo'}
        return 'Done'
    }
    toggle(event){
        event.preventDefault();
        if(this.props.step.done){
            this.props.step.done = false;
            this.setState({status:'Done'})
        }
        else{
            this.props.step.done = true;
            this.setState({ status: 'Undo' })
        }
    }

    removeStep(event){
        event.preventDefault();
        this.props.removeStep(this.props.step.id)
    }


    render(){
        return (
            <li className="details-step"> 
                <p>{this.props.step.title}</p>
                <p>{this.props.step.description}</p>
                <button className={this.state.status} onClick={this.toggle}>{this.state.status}</button>
                <button onClick={this.removeStep}>Delete</button>
            </li>
        )
    }
} 