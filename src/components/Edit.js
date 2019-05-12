import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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
      imageURL: "",
      id: ""
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

      // TODO ISEMPTY

      // Set state
      this.setState({
        name: post.name,
        title: post.title,
        subTitle: post.subTitle,
        body: post.body,
        imageURL: post.imageURL,
        id: post.id
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const editData = {
      name: this.state.name,
      title: this.state.title,
      subTitle: this.state.subTitle,
      body: this.state.body,
      imageURL: this.state.imageURL,
      id: this.state.id
    };

    this.props.editPost(editData, this.props.history);
  };

  delete(id) {
    this.props.deletePost(id, this.props.history);
  }

  render() {
    const { errors, name, title, subTitle, body, imageURL, id } = this.state;

    return (
      <div>
        <div className="container pb-5">
          <h1 className="display-4 pt-5 pb-4">Edit post</h1>

          <form onSubmit={this.onSubmit} className="w-full max-w-md">
            <div className="flex items-center border-b border-b-2 border-teal py-2 mb-4">
              <input
                className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter author alias"
                name="name"
                value={name}
                onChange={this.onChange}
                error={errors.title}
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <InputGroup
                divClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                forAttr="grid-title"
                labelTitle="Article Title"
                inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-title"
                type="text"
                placeholder="Enter title here ..."
                name="title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />

              <InputGroup
                divClassName="w-full md:w-1/2 px-3"
                labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                forAttr="grid-subTitle"
                labelTitle="Article Caption"
                inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-subTitle"
                type="text"
                placeholder="Enter sub-title ..."
                name="subTitle"
                value={subTitle}
                onChange={this.onChange}
                error={errors.subTitle}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <TextAreaGroup
                divClassName="w-full px-3"
                labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                forAttr="grid-body"
                labelTitle="Article Body"
                textAreaClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-body"
                type="text"
                placeholder="Enter article body ..."
                rows="10"
                name="body"
                value={body}
                onChange={this.onChange}
                error={errors.body}
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <InputGroup
                divClassName="w-full px-3"
                labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                forAttr="grid-image"
                labelTitle="Image"
                inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-image"
                type="text"
                placeholder="Enter image URL ..."
                name="imageURL"
                value={imageURL}
                onChange={this.onChange}
                error={errors.imageURL}
              />
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
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post
});

export default connect(
  mapStateToProps,
  { editPost, deletePost, getCurrentPost }
)(withRouter(Edit));
