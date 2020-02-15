import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import raidReducer from "./raidReducer";

const reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  raid: raidReducer
})

export default reducers;
