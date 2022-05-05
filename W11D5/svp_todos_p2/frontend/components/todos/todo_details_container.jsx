import { connect } from "react-redux";
import TodoDetails from "./todo_details";
import { steps } from "../selector";


const mapStateToProps = (state) =>({
    steps: todoId => steps(state)(todoId)
})

const mapDispatchtoProps = dispatch =>({
    receiveStep: step=> dispatch(receiveStep(step)),
    removeStep: id => dispatch(removeStep(id))
})

export default connect(mapStateToProps,
                    mapDispatchtoProps)(TodoDetails)