import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/* import PropTypes from "prop-types";
 import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAllPosts } from "../actions/PostAction"; */

import search from "../img/search.png";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("/posts").then(res => {
      this.setState({ posts: res.data });
      console.log(this.state.posts);
    });
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginBottom: "575px" }}>
          <h1 className="display-3 text-center pt-3 pb-1">
            Browse recent posts
          </h1>
          <img src={search} alt="" />
          <div className="d-flex justify-content-between">
            <div />
            <h2 className=" font-weight-bold text-center">Featured Posts</h2>

            <p>
              <a
                className="btn btn-outline-secondary"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Sort by hashtag
              </a>
            </p>
          </div>
          <div className="collapse mt-4" id="collapseExample">
            <div className="card card-body border border-white">
              <p>
                <span
                  className="badge badge-pill badge-dark btn-outline-secondary mr-3 pt-2 pb-2"
                  style={{ width: "10%" }}
                >
                  <button className="text-white font-weight-bold">
                    Secondary
                  </button>
                </span>

                <span
                  className="badge badge-pill badge-dark btn-outline-secondary mr-3 pt-2 pb-2"
                  style={{ width: "10%" }}
                >
                  <button className="text-white font-weight-bold">
                    Secondary
                  </button>
                </span>

                <span
                  className="badge badge-pill badge-dark btn-outline-secondary mr-3 pt-2 pb-2"
                  style={{ width: "10%" }}
                >
                  <button className="text-white font-weight-bold">
                    Secondary
                  </button>
                </span>

                <span
                  className="badge badge-pill badge-dark btn-outline-secondary mr-3 pt-2 pb-2"
                  style={{ width: "10%" }}
                >
                  <button className="text-white font-weight-bold">
                    Secondary
                  </button>
                </span>

                <span
                  className="badge badge-pill badge-dark btn-outline-secondary mr-3 pt-2 pb-2"
                  style={{ width: "10%" }}
                >
                  <button className="text-white font-weight-bold">
                    Secondary
                  </button>
                </span>
              </p>
            </div>
          </div>
          {/* <nav className="uk-navbar-container mt-3" uk-navbar="true">
            <div className="uk-navbar-left">
              <div className="uk-navbar-item">
                <form className="uk-search uk-search-navbar">
                  <span uk-search-icon="true" />
                  <input
                    className="uk-search-input ml-3"
                    type="search"
                    placeholder="Search by tags . . ."
                  />
                </form>
              </div>
            </div>
          </nav> */}

          <hr className="pt-3 pb-4" />

          {this.state.posts.map(p => (
            <div>
              <Link to={`/show/${p.id}`}>
                <img
                  style={{ display: "block" }}
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
          ))}
        </div>
      </div>
    );
  }
}

/* Posts.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
}); */

export default Posts;
