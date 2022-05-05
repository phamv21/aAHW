import React from "react";

export default class TodoDetailsForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            id: this.uniqueId(),
            todo_id: this.props.todoId,
            title: '',
            description: '',
            done: false
        };
        //
        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.createStep = this.createStep.bind(this);
        // this.resetForm = this.resetForm.bind(this);
    }

    uniqueId(){
        return new Date().getTime()
    }
    updateTitle(event){
        this.setState({title:event.currentTarget.value})
    }
    updateDescription(event){
        this.setState({ description: event.currentTarget.value })
    }
    createStep(event){
        //on submit
        event.preventDefault();
        this.props.receiveStep(this.state);
        console.log(this.props.receiveStep)
        this.resetForm();
    }

    resetForm(){
        this.setState({
            id: this.uniqueId(),
            todo_id: this.props.todoId,
            title: '',
            description: '',
            done: false 
        })
    }


    render() {
        return (
            <form className="step-form form">
                <label>
                    Title:
                <input className="input" type="text" name="" id="" onChange={this.updateTitle} value={this.state.title}/>
                </label>
                <label>
                    Description:
                <textarea className="input" type="text" name="" id="" onChange={this.updateDescription} value={this.state.description}/>
                    </label>
                <input className="create-list" type="submit" name="" id="" onClick={this.createStep} value="New Step"/>
            </form>
        )
    }
}