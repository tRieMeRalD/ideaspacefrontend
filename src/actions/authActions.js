import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, SET_ACCOUNT_ID, SET_NAME } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData) // Send along data to database
    .then(res => {
      history.push("/login"); // Redirect to login if HTML 200
    })
    .catch(err => console.log(err));
};

export const loginUser = userData => dispatch => {
  axios.post("/api/auth/login", userData).then(res => {
    const { token } = res.data;
    // Set token to localStorage
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  });
};

export const setAccId = accountId => {
  return {
    type: SET_ACCOUNT_ID,
    payload: accountId // Send this value to redux manager
  };
};

export const setFullname = fullname => {
  return {
    type: SET_NAME,
    payload: fullname // Send this value to redux manager
  };
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded // Send this value to redux manager
  };
};

export const logoutUser = history => dispatch => {
  // Erase the jwtToken that keeps the user logged in
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser());
};
