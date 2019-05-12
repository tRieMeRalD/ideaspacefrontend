import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/userActions";

class Header extends Component {
  /*   onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  } */

  render() {
    const { isAuthenticated } = this.props.auth;

    const authNav = (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/profile" className="navbar-brand my-2 ml-3">
          My Profile
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/post" className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Create
              </Link>
            </li>
          </ul>
          <form className="form-inline pt-2 pb-2 my-2 mr-4 my-lg-0">
            <Link
              to="/logout"
              className="btn btn-outline-danger my-2 mr-3 my-sm-0"
            >
              Logout
            </Link>
          </form>
        </div>
      </nav>
    );

    const guestNav = (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand my-2 ml-3">
          IdeaSpace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/post" className="nav-link">
                Posts
              </Link>
            </li>
          </ul>
          <form className="form-inline pt-2 pb-2 my-2 mr-4 my-lg-0">
            <Link
              to="/login"
              className="btn btn-outline-success my-2 mr-3 my-sm-0"
            >
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-primary my-2 my-sm-0">
              Sign Up
            </Link>
          </form>
        </div>
      </nav>
    );

    return <div>{isAuthenticated ? authNav : guestNav}</div>;
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
