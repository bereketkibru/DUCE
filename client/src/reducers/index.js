import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import annReducer from "./annReducer";
import qandaReducer from "./qandaReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  ann: annReducer,
  qanda: qandaReducer,
});
