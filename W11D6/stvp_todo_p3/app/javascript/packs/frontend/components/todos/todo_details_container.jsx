import { connect } from "react-redux";
import TodoDetails from "./todo_details";
import { steps } from "../selector";
import { fetchSteps,receiveStep,recieveSteps,createStep,patchStep,destroyStep,updateStep } from "../../actions/step_actions";


const mapStateToProps = (state) =>({
    steps: todoId => steps(state)(todoId)
})

const mapDispatchtoProps = dispatch =>({
    fetchSteps: ()=>dispatch(fetchSteps()),
    receiveStep: step=> dispatch(receiveStep(step)),
    createStep: step => dispatch(createStep(step)),
    patchStep: step => dispatch(patchStep(step)),
    destroyStep: step => dispatch(destroyStep(step)),
    removeStep: step => dispatch(removeStep(step))
})

export default connect(mapStateToProps,
                    mapDispatchtoProps)(TodoDetails)