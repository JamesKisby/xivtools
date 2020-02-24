import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import raidReducer from "./raidReducer";
import itemReducer from "./itemReducer";

const reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  raid: raidReducer,
  items: itemReducer
})

export default reducers;
