import { combineReducers } from "redux";
import sessionErrorReducer from "./session_error_reducer";
import sessionUserReducer from "./session_user_reducer";

const sessionReducer = combineReducers({
    currentUser: sessionUserReducer,
    error: sessionErrorReducer
})
export default sessionReducer;