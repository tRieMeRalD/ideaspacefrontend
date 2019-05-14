import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import TextAreaGroup from "./common/TextAreaGroup";

import { commentSubmit } from "../actions/CommentActions";
import { addLike, removeLike } from "../actions/CommentActions";
import { setProfileLink } from "../actions/PostAction";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      errors: {},
      comments: [],
      posts: []
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get("/posts/" + this.props.match.params.id).then(res => {
      this.setState({ post: res.data });
    });

    axios.get("/comments").then(res => {
      this.setState({ comments: res.data });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // TODO ISEMPTY
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const commentData = {
      comment: this.state.comment,
      postId: this.props.match.params.id,
      accountId: this.props.auth.users
    };

    this.props.commentSubmit(commentData, this.props.history);
  };

  onClick = e => {
    e.preventDefault();

    axios.get("/posts").then(res => {
      this.setState({ posts: res.data });
    });

    this.props.setProfileLink(this.state.post.accountId);

    /*     this.state.posts.map(p => {
      if (p.accountId == this.state.post.accountId) {
        this.props.setProfileLink(p.id);
      }
    });

    axios.get(`/profile/${this.state.post.accountId}`).then(res => {
      this.props.history.push(`/profile/${this.state.post.accountId}`);
    }); */
  };

  onLikeClick(id) {
    /* this.props.addLike(id); */
    axios
      .put("/comments/" + id)
      .then(res => {
        this.props.history.push("/post");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { errors, comment } = this.state;

    return (
      <div>
        <img
          style={{ width: "100%", height: "800px" }}
          src={`${this.state.post.imageURL}`}
          alt=""
        />
        <div className="container" style={{ marginBottom: "400px" }}>
          <p className="text-muted text-center font-italic pt-2">
            {this.state.post.subTitle}
          </p>
          <h1 className="display-4 pt-2 pb-2">
            {this.state.post.title}

            {this.props.auth.users == this.state.post.accountId ? (
              <Link to={`/edit/${this.state.post.id}`}>
                {" "}
                <i class="fas fa-pencil-alt" />
              </Link>
            ) : null}
          </h1>
          <p className="text-muted pt-1">
            Author:
            <Link to={`/profile/${this.state.post.id}`}>
              {this.state.post.name}
            </Link>
          </p>

          <p className="lead pt-4">{this.state.post.body}</p>

          <hr className="mb-2 mt-4" />

          <h2 className="display-4 mb-3">Comments</h2>
          <form onSubmit={this.onSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <TextAreaGroup
                divClassName="w-full px-3"
                labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                forAttr="grid-comment"
                labelTitle="Your comment"
                textAreaClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="grid-body"
                type="text"
                placeholder="Enter comment ..."
                rows="3"
                name="comment"
                value={comment}
                onChange={this.onChange}
                error={errors.comment}
              />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>

          {this.state.comments.length == 0 ? (
            <div class="alert alert-warning mt-2" role="alert">
              No comments, be the first to comment!
            </div>
          ) : (
            <div>
              {this.state.comments.map(c => (
                <div>
                  {c.postId === this.state.post.id ? (
                    <span className="border border-white">
                      <div className="card mb-4 mt-4">
                        <div className="card-body">
                          <p className="card-text pb-2">
                            <small className="lead">{c.comment}</small>
                          </p>

                          {c.like}
                          <button
                            type="button"
                            onClick={this.onLikeClick.bind(this, c.postId)}
                          >
                            <i className="fas fa-thumbs-up pl-2 pr-3" />
                          </button>

                          {this.props.auth.users == c.accountId ? (
                            <button type="button">
                              <i class="fas fa-trash-alt" />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Show.propTypes = {
  errors: PropTypes.object.isRequired,
  commentSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  setProfileLink: PropTypes.func.isRequired
  /* addLike: PropTypes.func.isRequired, */
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { commentSubmit, setProfileLink /* addLike, */ }
)(withRouter(Show));
