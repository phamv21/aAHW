import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import benchReducer from "./benches_reducer";

const entitiesReducer = combineReducers({users:userReducer,benches:benchReducer});
export default entitiesReducer;