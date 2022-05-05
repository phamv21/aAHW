import { connect } from "react-redux";
import TodoList from "./todo_list";
import {allTodos} from "../selector";


const mapStateToProps = (state) =>({
    todos: allTodos(state)
})
const mapDispatchtoProps = (dispatch) =>({
    receiveTodo: todo => dispatch(receiveTodo(todo)),
    removeTodo: id => dispatch(removeTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchtoProps)(TodoList)
//mapStateToProps
//mapDispatchtoProps
//