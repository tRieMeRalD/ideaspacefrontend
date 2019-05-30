import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import search from "../img/search.png";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hashtags: [],
      tags: [],
      hashFilter: [],
      searchtags: [],
      postbytag: [],
      hashSearch: "",
      isToggleOn: false
    };
  }

  componentDidMount() {
    // GET posts from database
    axios.get("/posts").then(res => {
      this.setState({ posts: res.data });
      console.log(this.state.posts);
    });

    // GET all hashtags from database
    axios
      .get("/hashtags")
      .then(res => {
        this.setState({ hashtags: res.data });
        console.log(this.state.hashtags);
      })
      .catch(err => console.log(err));
  }

  // Add hashtag to hashSearch array
  addTag = tag => {
    this.state.posts.map(p => {
      p.hashtag.split(",").map(h => {
        if (h === tag) {
          this.setState(state => ({
            isToggleOn: !state.isToggleOn,
            hashSearch: this.state.hashSearch + h + ", "
          }));
        }
      });
    });
    console.log(this.state.isToggleOn);
  };

  // Reset hashSearch if wrong input
  clearSearch() {
    this.setState({ hashSearch: "" });
  }

  // Filter the tags and add to a hashFilter
  onFilter() {
    this.state.posts.map(p => {
      this.setState(
        { tags: this.state.tags.concat(this.state.tags.push(p.hashtag)) },
        () => console.log(this.state.tags)
      );
    });

    this.setState(
      {
        hashFilter: this.state.hashFilter.concat(
          this.state.hashSearch.split(", ")
        )
      },
      () => console.log(this.state.hashFilter)
    );

    // Cycles through hashFilter
    this.state.hashFilter.map(h => {
      this.state.tags[0].split(", ").map(t => {
        if (h === t) {
          this.state.hashtags.map(ht => {
            if (ht.hashtags === t) {
              this.setState(
                {
                  searchtags: this.state.searchtags.concat(
                    this.state.searchtags.push(ht.accountId)
                  )
                },
                () => console.log(this.state.searchtags)
              );
            }
          });
        }
      });
    });

    // Retrieves post ID from the array and makes a GET request
    this.state.searchtags.map(t => {
      this.state.posts.map(p => {
        if (t === p.accountId && t !== "") {
          axios
            .get(`/posts/${p.id}`)
            .then(res => {
              this.setState(
                {
                  postbytag: this.state.postbytag.concat(
                    this.state.postbytag.push(res.data)
                  )
                },
                () => console.log(this.state.postbytag)
              );
            })
            .catch(err => console.log(err));
        }
      });
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
                Sort by popular tags
              </a>
            </p>
          </div>
          <div className="collapse mt-4" id="collapseExample">
            <div className="card card-body border border-white">
              <p>
                {this.state.posts.map(p => (
                  <div>
                    {p.hashtag.split(",").map(h => (
                      <span
                        className={`badge badge-pill ${
                          this.state.isToggleOn ? "badge-success" : "badge-dark"
                        } btn-outline-secondary mr-3 pt-2 pb-2 mb-2`}
                        style={{ width: "10%" }}
                      >
                        <button
                          className="text-white font-weight-bold"
                          onClick={this.addTag.bind(this, h)}
                        >
                          {h}
                        </button>
                      </span>
                    ))}
                  </div>
                ))}
              </p>

              <div>
                <button
                  onClick={this.onFilter.bind(this)}
                  className="btn btn-outline-success mt-2 mb-2"
                >
                  Submit
                </button>

                <p className="text-muted">
                  {this.state.hashSearch === ""
                    ? "Searching for nothing!"
                    : "You are searching for: " + this.state.hashSearch}
                </p>
                <p className="text-muted">
                  Not what you are looking for?{" "}
                  <button
                    onClick={this.clearSearch.bind(this)}
                    className="text-muted text-primary"
                  >
                    <u>Restart Search.</u>
                  </button>
                </p>
              </div>
            </div>
          </div>

          {this.state.postbytag.map(p => (
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

export default Posts;
