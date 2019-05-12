import React, { Component } from "react";

import landing from "../../img/landing2.png";
import online from "../../img/online.png";
import globe from "../../img/globe.png";
import network from "../../img/network.png";
import contact from "../../img/contact.png";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="height-bg">
          <div className="row h-100 pl-4">
            <div
              className="col-6 col-md-4 text-center my-auto"
              uk-scrollspy="cls: uk-animation-fade; repeat: true"
            >
              <h1 className="display-1">IdeaSpace</h1>
              <h3>A web blogging application</h3>
            </div>
            <div
              className="col-12 col-md-8"
              uk-scrollspy="cls: uk-animation-slide-right-small; repeat: true"
            >
              <img src={landing} alt="" />
            </div>
          </div>
        </div>

        <div className="pb-5 pt-5">
          <h2 className="font-weight-bold text-center">
            Welcome to IdeaSpace!
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src={online} alt="" />
              </div>
              <div className="col-6 pt-5">
                <h2 className="pb-3">Create blogs at a click of a button.</h2>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-6 pt-5">
                <h2 className="pb-3">Accessible everywhere.</h2>
                <p className="lead">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="col-6">
                <img src={globe} alt="" />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <img src={network} alt="" />
              </div>
              <div className="col-6 pt-4">
                <h2 className="pb-3">Grow your network.</h2>
                <p className="lead">
                  Venenatis a condimentum vitae sapien pellentesque habitant
                  morbi. Pretium fusce id velit ut tortor pretium viverra.
                  Cursus eget nunc scelerisque viverra mauris in aliquam sem.
                  Auctor augue mauris augue neque gravida in fermentum et
                  sollicitudin. Dolor purus non enim praesent elementum
                  facilisis.
                </p>
              </div>
            </div>

            <hr />

            <h2 className="font-weight-bold text-center pt-3 pb-4">
              Got a question?
            </h2>

            <div className="row">
              <div className="col-6">
                <h3 className="pb-3">Contact us through social media!</h3>
                <div className="row">
                  <div className="col-2">
                    <i className="fas fa-envelope-open-text fa-3x pb-4 pb-2" />
                    <br />
                    <i className="fab fa-facebook fa-3x pb-4" />
                    <br />
                    <i className="fab fa-twitter fa-3x" />
                  </div>

                  <div className="col">
                    <p className="lead pt-2">horizon.william14@gmail.com</p>
                    <p className="lead pt-5">@IdeaSpace</p>
                    <p className="lead pt-5">@IdeaSpace</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <img src={contact} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
