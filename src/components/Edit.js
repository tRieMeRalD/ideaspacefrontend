import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { editPost, deletePost, getCurrentPost } from "../actions/PostAction";
import InputGroup from "./common/InputGroup";
import TextAreaGroup from "./common/TextAreaGroup";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      name: "",
      title: "",
      subTitle: "",
      body: "",
      hashtag: "",
      imageURL: "",
      id: "",
      didSubmit: false,
      didFill: false,
      isTitleEmpty: true,
      isSubEmpty: true,
      isBodyEmpty: true,
      isImageEmpty: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post.post) {
      const post = nextProps.post.post;

      // Set state
      this.setState({
        name: post.name,
        title: post.title,
        subTitle: post.subTitle,
        body: post.body,
        hashtag: post.hashtag,
        imageURL: post.imageURL,
        id: post.id
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

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
    e.preventDefault();

    this.setState({ didSubmit: true });

    if (this.state.didFill) {
      const editData = {
        name: this.props.auth.fullname,
        title: this.state.title,
        subTitle: this.state.subTitle,
        body: this.state.body,
        hashtag: this.state.hashtag,
        imageURL: this.state.imageURL,
        id: this.state.id
      };

      this.props.editPost(editData, this.props.history);
    }
  };

  delete(id) {
    this.props.deletePost(id, this.props.history);
  }

  render() {
    const {
      errors,
      name,
      title,
      subTitle,
      body,
      imageURL,
      hashtag,
      id,
      isBodyEmpty,
      isImageEmpty,
      isSubEmpty,
      isTitleEmpty,
      didSubmit
    } = this.state;

    return (
      <div>
        <div className="container pb-5">
          <h1 className="display-4 pt-5 pb-4">Edit post</h1>

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
                <div className="invalid-feedback">Please enter a subtitle</div>
              ) : null}
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

            <div className="flex flex-wrap -mx-3 mb-6">
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
              className="btn btn-outline-danger btn-block btn-lg mt-4"
              onClick={this.delete.bind(this, id)}
            >
              Delete Post
            </button>
            <button
              type="submit"
              className="btn btn-outline-primary btn-block btn-lg mt-4"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  getCurrentPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { editPost, deletePost, getCurrentPost }
)(withRouter(Edit));
