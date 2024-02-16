import "../App.css";
import "./Footer.css";

import React, { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext.jsx";
import SocialButtons from "./SocialButtons";

import { Link } from "react-router-dom";

export default function Footer() {
  const { language } = useContext(LanguageContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="footer_container">
        <div className="footer_menu_items">
          <Link className="footer_logo menu_item" onClick={scrollToTop} to="/">
            L/E
          </Link>
          <Link className="menu_item" to="/">
            {language === "german" ? "start" : "home"}
          </Link>
          <Link className="menu_item" to="/about">
            {language === "german" ? "über" : "about"}
          </Link>
          <Link className="menu_item" to="/projects">
            {language === "german" ? "projekte" : "projects"}
          </Link>
          <Link className="menu_item" to="/contact">
            {language === "german" ? "kontakt" : "contact"}
          </Link>
        </div>
        <SocialButtons />
      </div>
    </>
  );
}
