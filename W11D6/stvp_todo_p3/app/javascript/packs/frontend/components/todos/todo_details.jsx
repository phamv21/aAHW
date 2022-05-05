//this render step which have todo_id, title done and description 
import { extend } from "jquery";
import React from "react";
import TodoDetailsForm from "./todo_details_form";
import DetailsItem from "./todo_details_item";
export default class TodoDetails extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchSteps();
    }
    render(){
    let steplist = this.props.steps(this.props.todoId);
    let list = steplist.map((step,idx)=>(
        <DetailsItem key={idx} todoId={this.props.todoId} step={step} removeStep={this.props.removeStep} destroyStep={this.props.destroyStep} createStep={this.props.createStep} patchStep={this.props.patchStep}/>
    ))
    return ( 
        //
        <div className="todo-details">
            <ul>
                {list}
            </ul>
            <TodoDetailsForm receiveStep={this.props.receiveStep} createStep={this.props.createStep} todoId={this.props.todoId} />
        </div>
    )
    }

}