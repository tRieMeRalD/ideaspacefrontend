import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class ShowProfileID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: [],
      profile: {}
    };
  }

  componentDidMount() {
    // TODO
    // GET profiles & map (p)
    //      If this.props.post account id = profile (p) account id
    //              Set the STATES for each field using that p.accountid
  }

  render() {
    return (
      <div className="container pt-5">
        {this.state.profile.map(p => (
          <div>
            {this.state.profile == undefined ? (
              <p className="lead pt-5 pb-3">
                No profile, create one <Link to="/dashboard">here</Link>
              </p>
            ) : (
              <div>
                {this.props.auth.users == p.id ? (
                  <div>
                    <div className="fb-profile">
                      {/*                       <img
                        style={{ display: "block", width: "100%", height: "525px" }}
                        className="mr-auto ml-auto img-responsive"
                        src={`${p.bgPic}`}
                      /> */}
                      <img
                        align="left"
                        className="fb-image-lg"
                        src={`${p.bgPic}`}
                      />
                      {/*                       <img
                        src={`${p.profilePic}`}
                        style={{ width: "200px", height: "200px" }}
                        className="rounded-circle img-responsive"
                      /> */}
                      <img
                        align="left"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderColor: "white"
                        }}
                        src={`${p.profilePic}`}
                        className="rounded-circle fb-image-profile thumbnail"
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

                    {/* <Link to={`/profile/edit/${this.props.auth.users}`}>
                      Edit Profile <i class="fas fa-pencil-alt" />
                    </Link> */}

                    <button onClick={this.onClick}>
                      Edit Profile <i class="fas fa-pencil-alt" />
                    </button>

                    <hr className="mt-5 pb-2" />

                    <p className="text-center">
                      {p.facebook != null ? (
                        <a
                          className="fb-ic"
                          href={`${p.facebook}`}
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
            {this.state.posts.length == undefined ? (
              <p className="lead pt-5 pb-3">
                No posts, create one <Link to="/create">here</Link>
              </p>
            ) : (
              <div>
                {this.props.auth.users == p.accountId ? (
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
                        alt=""
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

ShowProfileID.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  post: state.post
});

export default connect(mapStateToProps)(ShowProfileID);
