import React, { useState } from "react";
import "./stylish.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHotjar,
  FaRegQuestionCircle,
  FaCogs,
  FaComments,
} from "react-icons/fa";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <nav className={sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={showSidebar}>
        <div></div>
      </button>

      <ul onClick={showSidebar}>

        <li>
          <Link to="/" className="link">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <FaHotjar /> FHIR Exercise
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <FaRegQuestionCircle /> Lorem Ipsum Dolor Sit Amet
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <FaRegQuestionCircle /> Lorem Ipsum
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <FaComments /> Support
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <FaCogs /> Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
