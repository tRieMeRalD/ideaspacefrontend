import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import PostTab from "./components/Posts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import EditProfile from "./components/EditProfile";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/userActions";

import "./App.css";
import store from "./store";

if (localStorage.jwtToken) {
  // Set auth header to token
  setAuthToken(localStorage.jwtToken);

  // Get token information
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user
  store.dispatch(setCurrentUser(decoded));

  // Check expiry for token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/profile/edit/:id" component={EditProfile} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/show/:id" component={Show} />
            <Route exact path="/post" component={PostTab} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/logout" component={Logout} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
