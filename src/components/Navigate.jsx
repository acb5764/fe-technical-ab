import React from "react";
import { Link, withRouter } from "react-router-dom";
import bwellLogo from "../bwell_logo.png";
import profileImage from "../profileImage.png";

function Navigate(props) {
  var userName = "Rick Astley";

  return (
    <div className="navigate">
      <nav
        aria-label="Navigation Bar"
        className="navbar navnar-expand"
        style={{ backgroundColor: "#2E3586" }}
      >
        <div className="container">
          <img src={bwellLogo} className="App-logo" alt="logo"></img>
          <Link to="/" className="brandName">
            b.well FE Assignment
          </Link>

          <div>
            <ul className="navbar-navigate" aria-label="Navigate Account">
              <img
                src={profileImage}
                className="Profile-image"
                alt="bwell logo"
              ></img>
              <Link to="/" className="link">
                {userName}
              </Link>
              <Link to="/" className="link">
                Your Account
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default withRouter(Navigate);
