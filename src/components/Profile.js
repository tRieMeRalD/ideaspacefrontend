import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setEditProfile } from "../actions/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: [],
      posts: []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // GET all profiles from database
    axios
      .get("/profile")
      .then(res => {
        this.setState({ profile: res.data });
      })
      .catch(err => console.log(err));

    // GET all posts from database
    axios
      .get("/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  onClick = e => {
    // Prevent button functionality
    e.preventDefault();

    // Cycle through profiles and check if matches the account ID
    this.state.profile.map(p => {
      if (p.id === this.props.auth.users) {
        this.props.setEditProfile(p.accountId); // Set account ID to an edit global variable
      }
    });

    // Redirect to profile by the account ID
    axios
      .get("/profile")
      .then(res =>
        this.props.history.push(`/profile/edit/${this.props.auth.users}`)
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container pt-5">
        {this.state.profile.map(p => (
          <div>
            {this.state.profile === undefined ? (
              <p className="lead pt-5 pb-3">
                No profile, create one <Link to="/dashboard">here</Link>
              </p>
            ) : (
              <div>
                {this.props.auth.users === p.id ? (
                  <div>
                    <div className="fb-profile">
                      <img
                        align="left"
                        className="fb-image-lg"
                        src={`${p.bgPic}`}
                        alt="background"
                      />
                      <img
                        align="left"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderColor: "white"
                        }}
                        src={`${p.profilePic}`}
                        className="rounded-circle fb-image-profile thumbnail"
                        alt="Profile"
                      />
                      <div className="pl-2">
                        <div className="fb-profile-text">
                          <p className="font-weight-bold">
                            {this.props.auth.fullname}
                          </p>
                          <p className="lead pt-2 pb-1">{p.bioInfo}</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={this.onClick}>
                      Edit Profile <i class="fas fa-pencil-alt" />
                    </button>

                    <hr className="mt-5 pb-2" />

                    <p className="text-center">
                      {p.facebook != null ? (
                        <a
                          className="fb-ic"
                          href={`${p.facebook}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                            {" "}
                          </i>
                        </a>
                      ) : null}

                      {p.instagram != null ? (
                        <a
                          className="ig-ic"
                          href={`${p.instagram}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                            {" "}
                          </i>
                        </a>
                      ) : null}

                      {p.linkedin != null ? (
                        <a
                          className="li-ic"
                          href={`${p.linkedin}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                            {" "}
                          </i>
                        </a>
                      ) : null}

                      {p.github != null ? (
                        <a
                          className="gh-ic"
                          href={`${p.github}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x">
                            {" "}
                          </i>
                        </a>
                      ) : null}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}

        <hr className="pt-2" />
        <h2 className="font-weight-bold pt-1 pb-3">
          {this.props.auth.fullname}'s article feed:
        </h2>

        {this.state.posts.map(p => (
          <div>
            {this.state.posts.length === undefined ? (
              <p className="lead pt-5 pb-3">
                No posts, create one <Link to="/create">here</Link>
              </p>
            ) : (
              <div>
                {this.props.auth.users === p.accountId ? (
                  <div>
                    <Link to={`/show/${p.id}`}>
                      <img
                        style={{
                          width: "100%",
                          height: "500px",
                          display: "block"
                        }}
                        className="mr-auto ml-auto"
                        src={`${p.imageURL}`}
                        alt="thumbnail"
                      />
                    </Link>
                    <h3 className="font-weight-bold pt-2">{p.title}</h3>
                    <p className="lead pt-1">{p.subTitle}</p>
                    <p className="text-muted pt-3">Created by: {p.name}</p>
                    <hr className="pt-2 pb-3" />
                  </div>
                ) : (
                  <p className="lead pt-5 pb-3">
                    No posts, create one <Link to="/create">here</Link>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setEditProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { setEditProfile }
)(Profile);
