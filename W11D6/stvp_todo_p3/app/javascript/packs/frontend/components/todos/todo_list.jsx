import React from "react";
import TodoListItem from "./todo_list_item";
import TodoForm from "./todo_form";
// import { patchTodo } from "../../util/todo_api_util";
// import { updateTodo } from "../../actions/todo_actions";

export default class TodoList extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchTodos();
    }
    render(){
        let list = this.props.todos.map((todo,idx)=>(
            <TodoListItem key={idx} todo={todo} removeTodo={this.props.removeTodo} destroyTodo={this.props.destroyTodo} patchTodo={this.props.patchTodo} updateTodo={this.props.updateTodo} /> 
        ))
        let errorList = this.props.errors.map((error,idx)=>(
                <li key={idx}>
                    {error}
                </li>
        ))
        return (
        
            <div className="todo-main">
                <h1>Todo List </h1>
                { this.props.errors.length === 0 
                ? null 
                :    <ul className="display-error">
                        {errorList}
                    </ul>
                }
            <TodoForm createTodo={this.props.createTodo} receiveTodo={this.props.receiveTodo} /> 
            {/* <TodoListItem todos={todos} />  */}
            <ul className="list-items form">
                {list}
            </ul>
            </div>
        )
        }

}


