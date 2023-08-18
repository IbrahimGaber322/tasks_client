import { combineReducers } from "redux";
import tasksReducer from "./tasks";
import userReducer from "./users";

// Combine multiple reducers using combineReducers
export default combineReducers({
  tasks: tasksReducer, // tasksReducer handles tasks related state
  user: userReducer, // userReducer handles user related state
});
