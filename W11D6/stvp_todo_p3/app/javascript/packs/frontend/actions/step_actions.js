// step has todo_id, title and done:boolean
import * as APIUtil from '../util/step_api_util'
import { receiveTodoError,clearTodoError } from './todo_error';

export const RECEIVE_STEP = 'RECEIVE_STEP';
export const RECEIVE_STEPS = 'RECEIVE_STEPS';
export const UPDATE_STEP = 'UPDATE_STEP'
export const REMOVE_STEP = 'REMOVE_STEP';


export const receiveStep = (step) =>{
    return {
        type: RECEIVE_STEP,
        step
    }
}
export const receiveSteps = (steps) => { // steps is array
    return {
        type: RECEIVE_STEPS,
        steps
    }
}

export const updateStep = (step) => {
    return{
        type: UPDATE_STEP,
        step
    }
}

export const removeStep = (step) => { // steps is array
    return {
        type: REMOVE_STEP,
        step
    }
}

export const fetchSteps =() => dispatch =>{
    APIUtil.fetchSteps().then(
        steps => {
            dispatch(clearTodoError());
            return dispatch(receiveSteps(steps))},
            err => dispatch(receiveTodoError(err.responseJSON))
    )
}

export const createStep = (step) => dispatch =>{
    return APIUtil.createStep(step).then(
        step =>{
            dispatch(clearTodoError());
            return dispatch(receiveStep(step))
        },
        err => dispatch(receiveTodoError(err.responseJSON))
    )
}

export const patchStep = step => dispatch =>{
    return APIUtil.patchStep(step).then(
        step => {
            dispatch(clearTodoError());
            return dispatch(updateStep(step))
        },
        err => dispatch(receiveTodoError(err.responseJSON)) 
    )
}

export const destroyStep = step => dispatch =>{
    return APIUtil.destroyStep(step).then(
        step => {
            dispatch(clearTodoError());
           return dispatch(removeStep(step));
        },
        err => dispatch(receiveTodoError(err.responseJSON))
    )
}


///for testing 
window.receiveStep = receiveStep;
window.receiveSteps = receiveSteps;
window.removeStep = removeStep;
window.fetchSteps = fetchSteps;