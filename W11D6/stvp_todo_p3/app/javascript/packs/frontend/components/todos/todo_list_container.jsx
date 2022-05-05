import { connect } from "react-redux";
import TodoList from "./todo_list";
import {allTodos} from "../selector";
import { fetchTodos,receiveTodo, removeTodo, destroyTodo, createTodo, patchTodo,updateTodo } from "../../actions/todo_actions";

const mapStateToProps = (state) =>({
    todos: allTodos(state),
    errors: state.errors
})
const mapDispatchtoProps = (dispatch) =>({
    fetchTodos: ()=>dispatch(fetchTodos()),
    createTodo: todo => dispatch(createTodo(todo)),
    receiveTodo: todo => dispatch(receiveTodo(todo)),
    patchTodo: todo => dispatch(patchTodo(todo)),
    updateTodo: todo => dispatch(updateTodo(todo)),
    removeTodo: todo => dispatch(removeTodo(todo)),
    destroyTodo: todo => dispatch(destroyTodo(todo))
})

export default connect(
    mapStateToProps,
    mapDispatchtoProps)(TodoList)
//mapStateToProps
//mapDispatchtoProps
//