import {
  GET_POST,
  SET_PROFILE_ID,
  SET_EDIT_DONE,
  SET_CREATE_DONE
} from "../actions/types";

const initialState = {
  post: null,
  posts: null,
  profileId: "",
  setEditDone: false,
  setCreateDone: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case SET_PROFILE_ID:
      return {
        ...state,
        profileId: action.payload
      };
    case SET_EDIT_DONE:
      return {
        ...state,
        setEditDone: action.payload
      };
    case SET_CREATE_DONE:
      return {
        ...state,
        setCreateDone: action.payload
      };
    default:
      return state;
  }
}
