import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { postSubmit, setCreateDone } from "../actions/PostAction";
import InputGroup from "./common/InputGroup";
import TextAreaGroup from "./common/TextAreaGroup";

import post from "../img/post.png";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      title: "",
      subTitle: "",
      body: "",
      hashtag: "",
      hashtags: "",
      imageURL: "",
      errors: {},
      didSubmit: false,
      didFill: false,
      isTitleEmpty: true,
      isSubEmpty: true,
      isBodyEmpty: true,
      isImageEmpty: true,
      justCreated: [],
      posts: [],
      didRedirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    // Redirect to most recent post
    if (this.state.didRedirect) {
      this.setState({ didRedirect: false });

      if (
        this.state.justCreated !== undefined ||
        this.state.justCreated !== null
      ) {
        this.state.posts.map(p => {
          if (
            p.accountId === this.props.auth.users &&
            p !== undefined &&
            p !== null
          ) {
            this.setState(
              {
                justCreated: this.state.justCreated.concat(
                  this.state.justCreated.unshift(p.id)
                )
              },
              () => console.log(this.state.justCreated)
            );
          }
        });

        // Redirects to the most recent post
        this.props.history.push(`/show/${this.state.justCreated[0]}`);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // Updates error fields
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // Update HTMl fields
  onChange = e => {
    // Updates state when detects input
    this.setState({ [e.target.name]: e.target.value });

    // Check states if empty --> if not update boolean
    if (this.state.title !== "" && this.state.didSubmit) {
      this.setState({ isTitleEmpty: false });
    } else {
      this.setState({ isTitleEmpty: true });
    }

    if (this.state.subTitle !== "" && this.state.didSubmit) {
      this.setState({ isSubEmpty: false });
    } else {
      this.setState({ isSubEmpty: true });
    }

    if (this.state.body !== "" && this.state.didSubmit) {
      this.setState({ isBodyEmpty: false });
    } else {
      this.setState({ isBodyEmpty: true });
    }

    if (this.state.imageURL !== "" && this.state.didSubmit) {
      this.setState({ isImageEmpty: false });
    } else {
      this.setState({ isImageEmpty: true });
    }

    // If everything is filled update boolean
    if (
      !this.state.isTitleEmpty &&
      !this.state.isSubEmpty &&
      !this.state.isBodyEmpty &&
      !this.state.isImageEmpty
    ) {
      this.setState({ didFill: true });
    }
  };

  onSubmit = e => {
    // Disable button function
    e.preventDefault();

    // Set boolean that submit button was triggered
    this.setState({ didSubmit: true });

    // Redirect to post just made
    this.setState({ didRedirect: true });

    if (this.state.didFill) {
      // Getting data from HTMl fields
      const postData = {
        name: this.props.auth.fullname,
        title: this.state.title,
        subTitle: this.state.subTitle,
        body: this.state.body,
        imageURL: this.state.imageURL,
        hashtag: this.state.hashtag,
        accountId: this.props.auth.users
      };

      // Split string by ',' as indicated by instructions
      var strHash = this.state.hashtag;
      var arrHash = strHash.split(",");

      for (var i = 0; i <= arrHash.length; i++) {
        if (arrHash[i] !== undefined || arrHash[i] !== "") {
          // Append each hashtag to database
          const hashData = {
            accountId: this.props.auth.users,
            hashtags: this.state.hashtags.concat(arrHash[i])
          };

          // SAVE each hashtag to database
          axios
            .post("/hashtags", hashData)
            .then(res => console.log("Tagged!"))
            .catch(err => console.log(err));
        }
      }

      // For success message
      this.props.setCreateDone(true);

      // Submit
      this.props.postSubmit(postData, this.props.history);
    }
  };

  render() {
    const {
      title,
      subTitle,
      body,
      imageURL,
      errors,
      hashtag,
      isBodyEmpty,
      isImageEmpty,
      isSubEmpty,
      isTitleEmpty,
      didSubmit
    } = this.state;

    return (
      <div className="container pb-5">
        <div className="row">
          <div className="col-6">
            <h1 className="display-4 pt-5 pb-4">Create a new post</h1>

            <form onSubmit={this.onSubmit} className="w-full max-w-md">
              <div className="flex flex-wrap -mx-3 mb-6">
                <InputGroup
                  divClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-title"
                  labelTitle="Article Title"
                  inputClassName={classnames("form-control", {
                    "is-valid": !isTitleEmpty && didSubmit,
                    "is-invalid": isTitleEmpty && didSubmit
                  })}
                  id="grid-title"
                  type="text"
                  placeholder="Enter title here ..."
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                {isTitleEmpty ? (
                  <div className="invalid-feedback">Please enter a title</div>
                ) : null}

                <div>
                  <InputGroup
                    divClassName=""
                    labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    forAttr="grid-subTitle"
                    labelTitle="Article Caption"
                    inputClassName={classnames("form-control", {
                      "is-valid": !isSubEmpty && didSubmit,
                      "is-invalid": isSubEmpty && didSubmit
                    })}
                    id="grid-subTitle"
                    type="text"
                    placeholder="Enter sub-title ..."
                    name="subTitle"
                    value={subTitle}
                    onChange={this.onChange}
                    error={errors.subTitle}
                  />
                  {isSubEmpty ? (
                    <div className="invalid-feedback">
                      Please enter a subtitle
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <TextAreaGroup
                  divClassName="w-full px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-body"
                  labelTitle="Article Body"
                  textAreaClassName={classnames("form-control", {
                    "is-valid": !isBodyEmpty && didSubmit,
                    "is-invalid": isBodyEmpty && didSubmit
                  })}
                  id="grid-body"
                  type="text"
                  placeholder="Enter article body ..."
                  rows="10"
                  name="body"
                  value={body}
                  onChange={this.onChange}
                  error={errors.body}
                />
                {isBodyEmpty ? (
                  <div className="invalid-feedback">
                    Please enter some article text
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                <InputGroup
                  divClassName="w-full px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-tag"
                  labelTitle="Hashtags"
                  inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="grid-tag"
                  type="text"
                  placeholder="Enter hashtags ..."
                  name="hashtag"
                  value={hashtag}
                  onChange={this.onChange}
                  error={errors.hashtag}
                />
                <p className="text-muted ml-3 mt-2">
                  Separate hashtags with a ","
                </p>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                <InputGroup
                  divClassName="w-full px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-image"
                  labelTitle="Image"
                  inputClassName={classnames("form-control", {
                    "is-valid": !isImageEmpty && didSubmit,
                    "is-invalid": isImageEmpty && didSubmit
                  })}
                  id="grid-image"
                  type="text"
                  placeholder="Enter image URL ..."
                  name="imageURL"
                  value={imageURL}
                  onChange={this.onChange}
                  error={errors.imageURL}
                />
                {isImageEmpty ? (
                  <div className="invalid-feedback">
                    Please enter an image URL
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary btn-block btn-lg mt-4"
              >
                Create Post
              </button>
            </form>
          </div>

          <div className="col-6 my-auto pt-5 pl-5">
            <img src={post} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  postSubmit: PropTypes.func.isRequired,
  setCreateDone: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { postSubmit, setCreateDone }
)(withRouter(Create));
