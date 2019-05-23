import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { submitProfile, setEditProfile } from "../actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      profiles: [],
      profilePic: "",
      bgPic: "",
      bioInfo: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      github: ""
    };
  }

  componentDidMount() {
    // Get users database
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));

    // Get profile
    axios.get("/profile").then(res => {
      this.setState({ profiles: res.data });
    });
  }

  componentDidUpdate() {
    // Check if user profile is created --> redirect if created
    this.state.profiles.map(p => {
      if (p.id === this.props.auth.users) {
        this.props.setEditProfile(p.accountId);
        this.props.history.push(`/profile/edit/${this.props.auth.users}`);
      }
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      profilePic: this.state.profilePic,
      bgPic: this.state.bgPic,
      bioInfo: this.state.bioInfo,
      instagram: this.state.instagram,
      github: this.state.github,
      linkedin: this.state.linkedin,
      facebook: this.state.facebook,
      fullname: this.props.auth.fullname,
      id: this.props.auth.users
    };

    this.props.submitProfile(profileData, this.props.history);
  };

  render() {
    const {
      profilePic,
      bgPic,
      bioInfo,
      instagram,
      github,
      linkedin,
      facebook
    } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "500px" }}>
        <h1 className="display-4">Configure Profile Settings</h1>

        <form className="pt-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="profilePic">Profile picture URL</label>
            <input
              type="text"
              className="form-control"
              id="profilePic"
              name="profilePic"
              value={profilePic}
              onChange={this.onChange}
              placeholder="Enter image address"
            />
          </div>

          <div className="form-group">
            <label for="bgPic">Background picture URL</label>
            <input
              type="text"
              className="form-control"
              id="bgPic"
              name="bgPic"
              value={bgPic}
              onChange={this.onChange}
              placeholder="Enter image address"
            />
          </div>

          <div className="form-group">
            <label for="bioInfo">Tell us about yourself</label>
            <textarea
              className="form-control"
              id="bioInfo"
              rows="4"
              placeholder="Enter as much as you would like . . ."
              name="bioInfo"
              value={bioInfo}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mt-2 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="instagram">
                <i class="fab fa-instagram" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Instagram Handle"
              aria-label="Instagram"
              aria-describedby="instagram"
              name="instagram"
              value={instagram}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="linkedin">
                <i class="fab fa-linkedin" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Linkedin Handle"
              aria-label="Linkedin"
              aria-describedby="linkedin"
              name="linkedin"
              value={linkedin}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="github">
                <i class="fab fa-github" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Github Handle"
              aria-label="Github"
              aria-describedby="github"
              name="github"
              value={github}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="facebook">
                <i class="fab fa-facebook-square" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Facebook Handle"
              aria-label="Facebook"
              aria-describedby="facebook"
              name="facebook"
              value={facebook}
              onChange={this.onChange}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-block btn-lg btn-primary"
          />
        </form>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  submitProfile: PropTypes.func.isRequired,
  setEditProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { submitProfile, setEditProfile }
)(Dashboard);
