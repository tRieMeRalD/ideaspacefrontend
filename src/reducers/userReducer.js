import { CLEAR_CURRENT_PROFILE, SET_EDIT_ID } from "../actions/types";

const initialState = {
  admin: null,
  edit: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        admin: null
      };
    case SET_EDIT_ID:
      return {
        ...state,
        edit: action.payload
      };
    default:
      return state;
  }
}
