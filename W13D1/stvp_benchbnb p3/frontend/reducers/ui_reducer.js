import { combineReducers } from "redux";
import filterReducer from "./filter_reducer";
import highlightReducer from "./highlight_reducer";

const uiReducer = combineReducers({filters:filterReducer,highlight:highlightReducer})
export default uiReducer