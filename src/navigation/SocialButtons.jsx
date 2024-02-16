// /src/navigation/SocialButtons.jsx

import React from "react";
import { Link } from "react-router-dom";
// React Icons
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
// Styles
import "../App.css";
import "./SocialButtons.css";

// -------------------- SocialButtons component -------------------- //
export default function SocialButtons() {
  // -------------------- Render The Social Buttons Component -------------------- //
  return (
    <IconContext.Provider value={{ className: "social-icon", size: "25" }}>
      <div className="social_items">
        <Link
          className="social_item"
          to="https://www.linkedin.com/in/louis-eiden-6a4852188/"
        >
          <FaIcons.FaLinkedin id="linkedin" />
        </Link>
        <Link className="social_item" to="https://www.figma.com/@LouisEiden">
          <FaIcons.FaFigma id="figma" />
        </Link>
        <Link className="social_item" to="https://github.com/Louis-Eiden">
          <FaIcons.FaGithub id="github" />
        </Link>
        <Link
          className="social_item"
          to="https://www.youtube.com/@louiseiden3898"
        >
          <FaIcons.FaYoutube id="youtube" />
        </Link>
        <Link className="social_item" mailto="eidenlouis.mt@gmail.com">
          <FaIcons.FaEnvelope id="mail" />
        </Link>
      </div>
    </IconContext.Provider>
  );
}
