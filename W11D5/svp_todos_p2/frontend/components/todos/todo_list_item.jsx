import React from "react";
import TodoDetailsContainer from "./todo_details_container";
export default class TodoListItem extends React.Component{  

    constructor(props){
        super(props);
        this.state ={
            buttonStatus: this.buttonStatus(),
            show: false
        }
        this.toggle = this.toggle.bind(this);
        this.buttonStatus = this.buttonStatus.bind(this);
        this.removeList = this.removeList.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    buttonStatus(){
        if (this.props.todo.done) {  return 'Undo' }
        if (!this.props.todo.done) {  return 'Done' }
    }
    toggle(event){
        event.preventDefault();
        if (this.props.todo.done) { 
            this.props.todo.done = false;this.setState({buttonStatus:'Done'}) }
        else{
            this.props.todo.done = true; this.setState({buttonStatus :'Undo'})
            }
    }
    removeList(event){
        event.preventDefault();
        this.props.removeTodo(this.props.todo.id);
    }
    toggleShow(){
        if(this.state.show){
            this.setState({show:false})
        }else{
            this.setState({show:true})
        }
    }

    render(){

    return (
        <div>
        <li className="list-item" >
                <h3 className="item-title" onClick={this.toggleShow}>{this.props.todo.title}</h3>
                <button className={ this.state.buttonStatus } onClick={this.toggle}>{this.state.buttonStatus}</button>
        </li>
        { this.state.show ? 
        <li className="list-item-details">
            <TodoDetailsContainer todoId={this.props.todo.id}></TodoDetailsContainer>
            <button className="remove-list" onClick={this.removeList} >Remove this list</button>
        </li>
            : null }

        </div>

    )
    }
 
}
