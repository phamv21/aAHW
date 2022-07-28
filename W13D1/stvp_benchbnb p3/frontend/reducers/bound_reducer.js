import { UPDATE_BOUNDS} from "../actions/bound_actions";


const boundReducer = (state={},action) =>{
    Object.freeze(state);
    switch (action.type) {
        case UPDATE_BOUNDS:
            return action.bounds;
        default:
            return state;
    }
}

export default boundReducer;