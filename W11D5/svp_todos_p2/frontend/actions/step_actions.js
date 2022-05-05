// step has todo_id, title and done:boolean

export const RECEIVE_STEP = 'RECEIVE_STEP';
export const RECEIVE_STEPS = 'RECEIVE_STEPS';
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

export const removeStep = (id) => { // steps is array
    return {
        type: REMOVE_STEP,
        id
    }
}

///for testing 
window.receiveStep = receiveStep;
window.receiveSteps = receiveSteps;
window.removeStep = removeStep;