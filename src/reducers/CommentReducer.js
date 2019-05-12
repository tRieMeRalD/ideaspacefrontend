import { GET_COMMENTS, GET_LIKES } from "../actions/types";

const initialState = { comment: null, comments: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case GET_LIKES:
      return {
        ...state,
        comments: action.payload
      };
    default:
      return state;
  }
}
