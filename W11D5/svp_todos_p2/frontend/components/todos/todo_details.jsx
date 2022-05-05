//this render step which have todo_id, title done and description 
import React from "react";
import TodoDetailsForm from "./todo_details_form";
import DetailsItem from "./todo_details_item";
const TodoDetails =({steps,receiveStep,removeStep,todoId}) =>{
    let steplist = steps(todoId);
    let list = steplist.map((step,idx)=>(
        <DetailsItem key={idx} step={step} removeStep={removeStep}/>
    ))
    return ( 
        //
        <div className="todo-details">
            <ul>
                {list}
            </ul>
            <TodoDetailsForm receiveStep={receiveStep} todoId={todoId} />
        </div>
    )
}
export default TodoDetails