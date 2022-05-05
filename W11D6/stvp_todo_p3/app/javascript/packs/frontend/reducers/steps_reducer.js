import { RECEIVE_STEP, RECEIVE_STEPS, REMOVE_STEP, UPDATE_STEP } from "../actions/step_actions";

const stepsReducer = (state ={}, action) =>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_STEP:
            let nextState = Object.assign({},state);
            nextState[action.step.id] = action.step;
            return nextState;
        case RECEIVE_STEPS:
            nextState = {};
            action.steps.map(el=>nextState[el.id]= el)
            return nextState;
        case UPDATE_STEP:
            nextState = Object.assign({},state);
            nextState[action.step.id] = action.step;
            return nextState;
        case REMOVE_STEP:
            nextState = Object.assign({}, state);
            delete nextState[action.step.id];
            return nextState;
        default:
            return state;
    }
}

export default stepsReducer;