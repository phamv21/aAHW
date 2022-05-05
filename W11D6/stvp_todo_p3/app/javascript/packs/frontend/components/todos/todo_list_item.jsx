import React from "react";
import TodoDetailsContainer from "./todo_details_container";
import TodoEditForm from "./todo_edit_form";
export default class TodoListItem extends React.Component{  

    constructor(props){
        super(props);
        this.state ={
            buttonStatus: this.buttonStatus(),
            show: false,
            showEdit: false
        }
        this.toggle = this.toggle.bind(this);
        this.buttonStatus = this.buttonStatus.bind(this);
        this.removeList = this.removeList.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
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
        this.props.patchTodo(this.props.todo)
    }
    removeList(event){
        event.preventDefault();
        // this.props.removeTodo(this.props.todo.id);
        this.props.destroyTodo(this.props.todo).then(() => this.props.removeTodo(this.props.todo))
    }
    toggleShow(){
        if(this.state.show){
            this.setState({show:false})
        }else{
            this.setState({show:true})
        }
    }

    toggleEdit(){
        if (this.state.showEdit) {
            this.setState({ showEdit: false })
        } else {
            this.setState({ showEdit: true })
        }  
    }

    render(){
        let tags =this.props.todo.tags;
        tags ||= [];
        let tag_buttons = tags.map((tag, idx) => (
            <button key={idx} type="button" className="tag-btn"> {tag.name}</button>
        ))

    return (
        <div>
        <li className="list-item" >
                <h3 className="item-title" onClick={this.toggleShow}>{this.props.todo.title}</h3>
                {/* edit button */}
                <button className="edit-button" onClick={this.toggleEdit}>Edit</button>   
                <button className={ this.state.buttonStatus } onClick={this.toggle}>{this.state.buttonStatus}</button>
        </li>
        {/* the edit form filed */}
        {this.state.showEdit ?
            <li className="edit-todo">
                <TodoEditForm todo={this.props.todo} patchTodo={this.props.patchTodo} updateTodo={this.props.updateTodo}  ></TodoEditForm>
                <button className="remove-list" onClick={this.removeList} >Remove this list</button>
            </li>
        : null}



        { this.state.show ? 
        <li className="list-item-details">
            <TodoDetailsContainer todoId={this.props.todo.id}></TodoDetailsContainer>
            <button className="remove-list" onClick={this.removeList} >Remove this list</button>
            <div className="tags">
                {tag_buttons}
            </div>
            {/* tags here */}
        </li>
            : null }

        </div>

    )
    }
 
}
