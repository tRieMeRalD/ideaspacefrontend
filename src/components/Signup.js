import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

import signup from "../img/signup.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      password: "",
      isUserEmpty: true,
      isPasswordEmpty: true,
      isNameEmpty: true,
      didSubmit: false,
      didFill: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // If logged in --> redirect
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    // Update states
    this.setState({ [e.target.name]: e.target.value });

    // Check empty
    if (this.state.email !== "" && this.state.didSubmit) {
      this.setState({ isUserEmpty: false });
    } else {
      this.setState({ isUserEmpty: true });
    }

    if (this.state.password !== "" && this.state.didSubmit) {
      this.setState({ isPasswordEmpty: false });
    } else {
      this.setState({ isPasswordEmpty: true });
    }

    if (this.state.fullname !== "" && this.state.didSubmit) {
      this.setState({ isNameEmpty: false });
    } else {
      this.setState({ isNameEmpty: true });
    }

    // Check if filled
    if (
      !this.state.isPasswordEmpty &&
      !this.state.isEmailEmpty &&
      !this.state.isNameEmpty
    ) {
      this.setState({ didFill: true });
    }
  };

  onSubmit = e => {
    // Prevent button functionality
    e.preventDefault();

    // Submit button triggered
    this.setState({ didSubmit: true });

    // Check if filled && save data
    if (this.state.didFill) {
      const userData = {
        email: this.state.email,
        fullname: this.state.fullname,
        password: this.state.password
      };

      // Submit
      this.props.registerUser(userData, this.props.history);
    }
  };

  render() {
    const {
      email,
      fullname,
      password,
      isNameEmpty,
      isPasswordEmpty,
      isUserEmpty,
      didSubmit
    } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "250px" }}>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit} className="form-signin">
              <h1 className="h3 mb-5 display-4 text-center">Signup Here</h1>

              <div className="mb-3">
                <label for="inputUsername" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="inputEmail"
                  className={classnames("form-control", {
                    "is-valid": !isUserEmpty && didSubmit,
                    "is-invalid": isUserEmpty && didSubmit
                  })}
                  placeholder="Username"
                  value={email}
                  onChange={this.onChange}
                />
                {isUserEmpty ? (
                  <div className="invalid-feedback">Please enter an email</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label for="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="inputPassword"
                  className={classnames("form-control", {
                    "is-valid": !isPasswordEmpty && didSubmit,
                    "is-invalid": isPasswordEmpty && didSubmit
                  })}
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
                {isPasswordEmpty ? (
                  <div className="invalid-feedback">
                    Please enter a password
                  </div>
                ) : null}
              </div>

              <div className="mb-5">
                <label for="inputFullname" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="inputEmail"
                  className={classnames("form-control", {
                    "is-valid": !isNameEmpty && didSubmit,
                    "is-invalid": isNameEmpty && didSubmit
                  })}
                  placeholder="Fullname"
                  value={fullname}
                  onChange={this.onChange}
                />
                {isNameEmpty ? (
                  <div className="invalid-feedback">
                    Please enter a password
                  </div>
                ) : null}
              </div>

              <button
                className="btn btn-lg btn-primary btn-block mb-2"
                type="submit"
              >
                Sign Up
              </button>
              <p className="lead mt-2">
                Already have an account? <Link to="/login">Login here.</Link>
              </p>
            </form>
          </div>
          <div className="col-6">
            <img src={signup} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Signup);
