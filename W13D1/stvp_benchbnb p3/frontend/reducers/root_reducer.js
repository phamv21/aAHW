import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import boundReducer from "./bound_reducer";
import uiReducer from "./ui_reducer";

const rootReducer = combineReducers({entities:entitiesReducer,session:sessionReducer,errors:errorsReducer,bounds:boundReducer,ui:uiReducer})
export default rootReducer