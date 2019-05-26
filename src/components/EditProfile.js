import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { updateProfile } from "../actions/userActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic: "",
      bgPic: "",
      bioInfo: "",
      profile: [],
      profileId: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      github: "",
      profiles: {},
      didSubmit: false,
      didFill: false,
      isPfpEmpty: true,
      isBgPicEmpty: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Get profile by ID && set states
    axios
      .get(`/profile/${this.props.user.edit}`)
      .then(res => {
        this.setState({
          profilePic: res.data.profilePic,
          bgPic: res.data.bgPic,
          bioInfo: res.data.bioInfo,
          instagram: res.data.instagram,
          facebook: res.data.facebook,
          github: res.data.github,
          linkedin: res.data.linkedin
        });
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    // Update states
    this.setState({ [e.target.name]: e.target.value });

    // Check if empty
    if (this.state.profilePic !== "" && this.state.didSubmit) {
      this.setState({ isPfpEmpty: false });
    } else {
      this.setState({ isPfpEmpty: true });
    }

    if (this.state.bgPic !== "" && this.state.didSubmit) {
      this.setState({ isBgPicEmpty: false });
    } else {
      this.setState({ isBgPicEmpty: true });
    }

    // Check if all filled
    if (!this.state.isBgPicEmpty && !this.state.isPfpEmpty) {
      this.setState({ didFill: true });
    }
  };

  onSubmit(e) {
    // Prevent button functionality
    e.preventDefault();

    // Submit button triggered
    this.setState({ didSubmit: true });

    // Update data only if filled
    if (this.state.didFill) {
      const updateData = {
        profilePic: this.state.profilePic,
        bgPic: this.state.bgPic,
        bioInfo: this.state.bioInfo,
        instagram: this.state.instagram,
        github: this.state.github,
        linkedin: this.state.linkedin,
        facebook: this.state.facebook,
        id: this.props.user.edit
      };

      // Update
      this.props.updateProfile(updateData, this.props.history);
    }
  }

  render() {
    const {
      profilePic,
      bgPic,
      bioInfo,
      instagram,
      github,
      linkedin,
      facebook,
      isBgPicEmpty,
      isPfpEmpty,
      didSubmit
    } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "500px" }}>
        <h1 className="display-4">Update Profile Settings</h1>

        <form className="pt-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="profilePic">Profile picture URL</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-valid": !isPfpEmpty && didSubmit,
                "is-invalid": isPfpEmpty && didSubmit
              })}
              id="profilePic"
              name="profilePic"
              value={profilePic}
              onChange={this.onChange}
              placeholder="Update your profile picture URL"
            />
            {isPfpEmpty ? (
              <div className="invalid-feedback">Please enter a profile URL</div>
            ) : null}
          </div>

          <div className="form-group">
            <label for="bgPic">Background picture URL</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-valid": !isBgPicEmpty && didSubmit,
                "is-invalid": isBgPicEmpty && didSubmit
              })}
              id="bgPic"
              name="bgPic"
              value={bgPic}
              onChange={this.onChange}
              placeholder="Update your background picture URL"
            />
            {isBgPicEmpty ? (
              <div className="invalid-feedback">
                Please enter a background URL
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label for="bioInfo">Tell us about yourself</label>
            <textarea
              className="form-control"
              id="bioInfo"
              rows="4"
              placeholder="Update your bio here . . ."
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
            value="Update Profile"
            className="btn btn-block btn-lg btn-primary"
          />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(EditProfile);
