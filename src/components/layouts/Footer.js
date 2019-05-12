import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer font-small bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5 ml-4">
                <div className="mb-5 flex-center">
                  <a
                    className="fb-ic"
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                      {" "}
                    </i>
                  </a>

                  <a
                    className="tw-ic"
                    href="https://twitter.com/"
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                      {" "}
                    </i>
                  </a>

                  <a
                    className="li-ic"
                    href="https://www.linkedin.com/"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                      {" "}
                    </i>
                  </a>

                  <a
                    className="ins-ic"
                    href="https://www.instagram.com"
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                      {" "}
                    </i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-copyright text-center py-3">
            IdeaSpace{" "}
            {new Date().getFullYear() === 2019
              ? new Date().getFullYear()
              : "2019 - " + new Date().getFullYear()}
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
