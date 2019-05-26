import axios from "axios";

import { CLEAR_CURRENT_PROFILE, SET_EDIT_ID } from "./types";

export const submitProfile = (profileData, history) => dispatch => {
  axios
    .post(`/profile/${profileData.id}`, profileData) // Send along data to database
    .then(res => history.push("/profile"))
    .catch(err => console.log(err));
};

export const updateProfile = (updateData, history) => {
  axios
    .put(`/profile/${updateData.id}`, updateData)
    .then(res => history.push("/profile"))
    .catch(err => console.log(err));
};

export const setEditProfile = profileId => {
  return {
    type: SET_EDIT_ID,
    payload: profileId
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE // On logout function call
  };
};
