import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import signup from "../img/signup.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    /* const { email, fullname, password } = this.state;

    axios
      .post("/api/auth/register", { email, fullname, password })
      .then(res => {
        this.props.history.push("/login");
      }); */

    const userData = {
      email: this.state.email,
      fullname: this.state.fullname,
      password: this.state.password
    };

    this.props.registerUser(userData, this.props.history);
  };

  render() {
    const { email, fullname, password } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "250px" }}>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit} className="form-signin">
              <h1 className="h3 mb-5 display-4 text-center">Signup Here</h1>

              <label for="inputUsername" className="sr-only">
                Username
              </label>
              <input
                type="email"
                name="email"
                id="inputEmail"
                className="form-control mb-3"
                placeholder="Username"
                value={email}
                onChange={this.onChange}
              />
              <label for="inputPassword" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="inputPassword"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={this.onChange}
              />
              <label for="inputFullname" className="sr-only">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="inputEmail"
                className="form-control mb-5"
                placeholder="Fullname"
                value={fullname}
                onChange={this.onChange}
              />
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
