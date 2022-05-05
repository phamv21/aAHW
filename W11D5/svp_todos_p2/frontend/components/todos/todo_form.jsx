import React from "react";


//title body submit

export default class TodoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.uniqueId(),
            title:'',
            body: '',
            done: false
        };
        this.titleTodo = this.titleTodo.bind(this);
        this.bodyTodo = this.bodyTodo.bind(this);
        this.submitTodo =this.submitTodo.bind(this);
        this.uniqueId = this.uniqueId.bind(this);
    
    }
    ///
    uniqueId() { 
        return new Date().getTime()
    }

    titleTodo(event){
        this.setState({ title:event.currentTarget.value})
    }
    bodyTodo(event){
        this.setState({ body: event.currentTarget.value })
    }
    submitTodo(event){

        event.preventDefault();
        this.props.receiveTodo(this.state)
        this.setState({id:'',title:'',body:''})

    }

    render(){
        return(
            <form action="" className="todo-form form">
                <label>
                    Title:
                    <input className="input" type="text" name="" id="" onChange={this.titleTodo} value={this.state.title}/>
                </label>
                <label>
                    Body:
                    <textarea className="input"  type="text" name="" id="" onChange={this.bodyTodo} value={this.state.body}/>
                </label>
                <input className="create-list"  type="submit" name="" id="" onClick={this.submitTodo} value='New List'/>
            </form>
            );
    }
}

