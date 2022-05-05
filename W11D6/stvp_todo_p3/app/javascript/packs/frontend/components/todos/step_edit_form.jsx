import React from "react";

export default class StepEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.step.id,
            todo_id: this.props.todoId,
            title: this.props.step.title,
            description: this.props.step.description,
            done: this.props.step.done
        };
        //
        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateStep = this.updateStep.bind(this);
        // this.resetForm = this.resetForm.bind(this);
    }

    updateTitle(event) {
        this.setState({ title: event.currentTarget.value })
    }
    updateDescription(event) {
        this.setState({ description: event.currentTarget.value })
    }
    updateStep(event) {
        //on submit
        event.preventDefault();
        this.props.patchStep(this.state);
    }




    render() {
        return (
            <form className="step-form form">
                <label>
                    Title:
                    <input className="input" type="text" name="" id="" onChange={this.updateTitle} value={this.state.title} />
                </label>
                <label>
                    Description:
                    <textarea className="input" type="text" name="" id="" onChange={this.updateDescription} value={this.state.description} />
                </label>
                <input className="create-list" type="submit" name="" id="" onClick={this.updateStep} value="Edit Step" />
            </form>
        )
    }
}