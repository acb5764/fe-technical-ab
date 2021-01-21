import React from "react";
import { Link, withRouter } from "react-router-dom";
import bwellLogo from "../bwell_logo.png";

function Navigate(props) {
  var userName = "Rick Astley";

  return (
    <div className="navigate">
      <nav
        className="navbar navnar-expand"
        style={{ backgroundColor: "#2E3586" }}
      >
        <div className="container">
            
          <img src={bwellLogo} className="App-logo" alt="logo"></img>
          <Link to="/" className="brandName">
            b.well FE Assignment
          </Link>
          <div style={{ color: "white" }}>
            <ul className="navbar-nav">
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
