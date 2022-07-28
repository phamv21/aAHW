import { UPDATE_BOUNDS,UPDATE_FILTER } from "../actions/bound_actions";
let defaultState = {
    bounds: {},
    min_seating: 1,
    max_seating: 10
}
const filterReducer = (state = defaultState, action) =>{
    Object.freeze(state);
    switch(action.type){
        case UPDATE_FILTER:
            let tmp = {};
            tmp[action.filter] = action.value;
            return Object.assign({},state,tmp);
        default:
            return state;
    }
}

export default filterReducer;