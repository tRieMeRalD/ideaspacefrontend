import { SET_CURRENT_USER, SET_ACCOUNT_ID, SET_NAME } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  users: "",
  fullname: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // Depends if the payload is empty or not
        user: action.payload
      };
    case SET_ACCOUNT_ID:
      return {
        ...state,
        users: action.payload
      };
    case SET_NAME:
      return {
        ...state,
        fullname: action.payload
      };
    default:
      return state;
  }
}
