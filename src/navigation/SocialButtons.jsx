// /src/navigation/SocialButtons.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../utils/useScreenSize";
// React Icons
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
// Styles
import "../App.css";
import "./SocialButtons.css";

// -------------------- SocialButtons component -------------------- //
export default function SocialButtons() {
  const { isMobile } = useScreenSize();

  // -------------------- Render The Social Buttons Component -------------------- //
  return (
    <IconContext.Provider
      value={{ className: "social-icon", size: isMobile ? "25" : "25" }}
    >
      <div className="social_items">
        <Link className="social_item" to="LinkedIn">
          <FaIcons.FaLinkedin id="linkedin" />
        </Link>
        <Link className="social_item" to="figma">
          <FaIcons.FaFigma id="figma" />
        </Link>
        <Link className="social_item" to="github">
          <FaIcons.FaGithub id="github" />
        </Link>
        <Link className="social_item" to="Youtube">
          <FaIcons.FaYoutube id="youtube" />
        </Link>
        <Link className="social_item" to="mail">
          <FaIcons.FaEnvelope id="mail" />
        </Link>
      </div>
    </IconContext.Provider>
  );
}
