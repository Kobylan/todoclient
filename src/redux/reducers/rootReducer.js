import { combineReducers } from "redux";
import todoReducer from "./todo/";

const rootReducer = combineReducers({
  todoApp: todoReducer,
});

export default rootReducer;
