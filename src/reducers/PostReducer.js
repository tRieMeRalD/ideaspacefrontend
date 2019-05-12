import { GET_ERRORS, GET_POST, GET_POSTS } from "../actions/types";

const initialState = { post: null, posts: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}
