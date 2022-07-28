import { RECEIVE_HIGHLIGHT } from "../actions/highlight_actions";


const highlightReducer = (state={benchId:null},action) =>{
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_HIGHLIGHT:
            return {benchId:action.benchId}
        default:
            return state;
    }

}
export default highlightReducer;

