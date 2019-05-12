import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import postReducer from "./PostReducer";
import commentReducer from "./CommentReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  errors: errorReducer,
  post: postReducer,
  comment: commentReducer,
  auth: authReducer,
  user: userReducer
});
