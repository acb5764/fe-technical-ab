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
    <nav
      className={sidebar ? "sidebar active" : "sidebar"}
      aria-label="Sidebar Div"
    >
      <button
        aria-label="Toggle Sidebar"
        className="hamburger"
        type="button"
        onClick={showSidebar}
      >
        <div></div>
      </button>

      <ul
        aria-label="Sidebar items"
        tabindex="0"
        role="document"
        onClick={showSidebar}
      >
        <li aria-label="Home" tabIndex="0">
          <Link to="/" className="link">
            <FaHome aria-label="House Icon" /> Home
          </Link>
        </li>
        <li tabIndex="0">
          <Link to="/" className="link">
            <FaHotjar aria-label="Hot Jar Icon" /> FHIR Exercise
          </Link>
        </li>
        <li tabIndex="0">
          <Link to="/" className="link">
            <FaRegQuestionCircle aria-label="Question Icon" /> Lorem Ipsum Dolor
            Sit Amet
          </Link>
        </li>
        <li tabIndex="0">
          <Link to="/" className="link">
            <FaRegQuestionCircle aria-label="Question Icon" /> Lorem Ipsum
          </Link>
        </li>
        <li tabIndex="0">
          <Link to="/" className="link">
            <FaComments aria-label="Support Icon" /> Support
          </Link>
        </li>
        <li tabIndex="0">
          <Link to="/" className="link">
            <FaCogs aria-label="Settings Icon" /> Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
