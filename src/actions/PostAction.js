import axios from "axios";

import { GET_ERRORS, GET_POST, SET_PROFILE_ID } from "./types";

// Get post
export const getCurrentPost = id => dispatch => {
  axios
    .get("/posts/" + id)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data // Send this value to redux manager
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: {} // Empty --> don't want to render anything
      })
    );
};

export const setProfileLink = profileId => {
  return {
    type: SET_PROFILE_ID,
    payload: profileId // Send this value to redux manager
  };
};

// Create post
export const postSubmit = (postData, history) => dispatch => {
  axios
    .post(`/posts/${postData.accountId}`, postData)
    .then(res => history.push("/create"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // Send this value to redux manager
      })
    );
};

// Edit post
export const editPost = (editData, history) => dispatch => {
  axios
    .put("/posts/" + editData.id, editData)
    .then(res => {
      history.push("/show/" + editData.id);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // Send this value to redux manager
      })
    );
};

// Delete post
export const deletePost = (id, history) => dispatch => {
  axios.delete("/posts/" + id).then(res => {
    history.push("/post");
  });
};
