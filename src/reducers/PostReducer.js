import {
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  SET_PROFILE_ID
} from "../actions/types";

const initialState = { post: null, posts: null, profileId: "" };

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
    default:
      return state;
  }
}
