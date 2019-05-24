import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { loginUser, setAccId, setFullname } from "../actions/authActions";

import login from "../img/login.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      accountId: "",
      users: [],
      didSubmit: false,
      isEmailEmpty: true,
      isPasswordEmpty: true,
      didFill: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.email !== "" && this.state.didSubmit) {
      this.setState({ isEmailEmpty: false });
    } else {
      this.setState({ isEmailEmpty: true });
    }

    if (this.state.password !== "" && this.state.didSubmit) {
      this.setState({ isPasswordEmpty: false });
    } else {
      this.setState({ isPasswordEmpty: true });
    }

    if (!this.state.isPasswordEmpty && !this.state.isEmailEmpty) {
      this.setState({ didFill: true });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ didSubmit: true });

    if (this.state.didFill) {
      axios
        .get("/users")
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => console.log(err));

      this.state.users.map(u => {
        if (u.email.trim() === this.state.email) {
          this.props.setAccId(u.id);
          this.props.setFullname(u.fullname);
        }
      });

      const userData = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.loginUser(userData);
    }
  };

  render() {
    const {
      email,
      password,
      isEmailEmpty,
      isPasswordEmpty,
      didSubmit
    } = this.state;

    return (
      <div className=" container pt-5" style={{ marginBottom: "250px" }}>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit} className="form-signin">
              <h1 className="h3 mb-5 display-4 text-center">
                Login into IdeaSpace
              </h1>

              <div className="mb-4">
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="inputEmail"
                  className={classnames("form-control", {
                    "is-invalid": isEmailEmpty && didSubmit
                  })}
                  placeholder="Email"
                  value={email}
                  onChange={this.onChange}
                />
                {isEmailEmpty ? (
                  <div className="invalid-feedback">
                    Please enter your email
                  </div>
                ) : null}
              </div>

              <div className="mb-5">
                <label for="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="inputPassword"
                  className={classnames("form-control", {
                    "is-invalid": isPasswordEmpty && didSubmit
                  })}
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
                {isPasswordEmpty ? (
                  <div className="invalid-feedback">
                    Please enter your password
                  </div>
                ) : null}
              </div>

              <button
                className="btn btn-lg btn-primary btn-block mb-2"
                type="submit"
              >
                Sign in
              </button>
            </form>
            <p className="lead mt-3">
              Don't have an account? <Link to="/signup">Sign up today!</Link>
            </p>
          </div>
          <div className="col-6">
            <img src={login} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAccId: PropTypes.func.isRequired,
  setFullname: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, setAccId, setFullname }
)(Login);
