// /src/navigation/SocialButtons.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../utils/useScreenSize";
// React Icons
import { IconContext } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
// Styles
import "../App.css";
import "./SocialButtons.css";

// -------------------- SocialButtons component -------------------- //
export default function SocialButtons() {
  const { isMobile } = useScreenSize();

  // -------------------- Render The Social Buttons Component -------------------- //
  return (
    <IconContext.Provider
      value={{ className: "social-icon", size: isMobile ? "15" : "25" }}
    >
      <div className="social_items">
        <Link className="social_item" to="facebook">
          <FaFacebook id="facebook" />
        </Link>
        <Link className="social_item" to="LinkedIn">
          <FaInstagram id="linkedin" />
        </Link>
        <Link className="social_item" to="github">
          <FaGithub id="github" />
        </Link>
        <Link className="social_item" to="Figma">
          <FaYoutube id="figma" />
        </Link>
        <Link className="social_item" to="mail">
          <FaEnvelope id="mail" />
        </Link>
      </div>
    </IconContext.Provider>
  );
}
