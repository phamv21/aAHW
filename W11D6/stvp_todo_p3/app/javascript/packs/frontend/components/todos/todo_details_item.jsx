import React from "react";
import StepEditForm from "./step_edit_form";
export default class DetailsItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status: this.getStatus(),
            showEdit: false
        };

        this.toggle = this.toggle.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this)

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
        this.props.patchStep(this.props.step)
    }

    toggleEdit(event){
        event.preventDefault();
        let editNow = this.state.showEdit;
        this.setState({showEdit:!editNow})

    }

    removeStep(event){
        event.preventDefault();
        this.props.destroyStep(this.props.step);
    }


    render(){
        return (
            <li className="details-step"> 
                <p>{this.props.step.title}</p>
                <p>{this.props.step.description}</p>
                <button className={this.state.status} onClick={this.toggle}>{this.state.status}</button>
                <button onClick={this.toggleEdit}>Edit</button>
                <button onClick={this.removeStep}>Delete</button>
                {this.state.showEdit ? 
                <div>
                    <StepEditForm todoId={this.props.todoId} step={this.props.step} patchStep ={this.props.patchStep} />
                </div>
                :null}
            </li>
        )
    }
} 