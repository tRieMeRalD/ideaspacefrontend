import React, { Component } from "react";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    // Removes user info and redirects
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="container pt-5" style={{ marginBottom: "600px" }}>
        <Link to="/post">&larr; Back to posts</Link>
        <h1 className="display-4 text-center pt-2">Signed Out Successfully!</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Logout);
