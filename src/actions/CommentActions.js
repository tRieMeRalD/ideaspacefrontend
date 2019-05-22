import axios from "axios";
import { GET_ERRORS, GET_LIKES } from "./types";

// Create comment
export const commentSubmit = (commentData, history) => dispatch => {
  axios
    .post(`/comments/${commentData.postId}`, commentData)
    .then(res => history.push("/posts"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Like comment
export const addLike = id => dispatch => {
  axios
    .post("/comments/addLike/" + id)
    .then(res => console.log("success"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove comment
export const removeLike = id => dispatch => {
  axios
    .post("/comments/removeLike/" + id)
    .then(res =>
      dispatch({
        type: GET_LIKES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LIKES,
        payload: {}
      })
    );
};
