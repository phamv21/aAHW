import React from "react";
import TodoListItem from "./todo_list_item";
import TodoForm from "./todo_form";

const TodoList = ({todos,receiveTodo,removeTodo}) =>{    
    let list = todos.map((todo,idx)=>(
        <TodoListItem key={idx} todo={todo} removeTodo={removeTodo}  /> 
    ))
    return (
        <div className="todo-main">
            <h1>Todo List </h1>
        <TodoForm receiveTodo={receiveTodo} /> 
        {/* <TodoListItem todos={todos} />  */}
        <ul className="list-items form">
            {list}
        </ul>
        </div>
    )
}


export default TodoList;