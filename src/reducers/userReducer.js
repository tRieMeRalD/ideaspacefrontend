import {
  CLEAR_CURRENT_PROFILE,
  SET_EDIT_ID,
  SET_PROFILE_DONE
} from "../actions/types";

const initialState = {
  admin: null,
  edit: "",
  setProfileDone: false
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
    case SET_PROFILE_DONE:
      return {
        ...state,
        setProfileDone: action.payload
      };
    default:
      return state;
  }
}
