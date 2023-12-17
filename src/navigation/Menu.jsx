import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../utils/LanguageContext";
import { ThemeContext } from "../utils/ThemeContext";

import SocialButtons from "./SocialButtons";

import Lebenslauf from "../assets/Lebenslauf.pdf";
import CV from "../assets/CV.pdf";

import { FiSun, FiMoon } from "react-icons/fi";
import { MdDownload } from "react-icons/md";

import "../App.css";
import "./Menu.css";

// -------------------- Menu Component -------------------- //
export default function Menu() {
  const [menuState, setMenuState] = useState("");
  const [menuButtonState, setMenuButtonState] = useState("");
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);

  // Theme changes
  useEffect(() => {
    // Access the html element
    const htmlElement = document.querySelector("html");

    // Check the theme and add/remove the dark class accordingly
    if (htmlElement) {
      if (theme === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleMenu = () => {
    setMenuState((prevMenuState) =>
      prevMenuState === "open" ? "close" : "open"
    );
  };

  const animateMenuButton = () => {
    setMenuButtonState((prevMenuButtonState) =>
      prevMenuButtonState === "enter" ? "leave" : "enter"
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  // Disable scrolling when menu is open
  useEffect(() => {
    if (menuState === "open") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuState]);

  // Parallax Mouse Effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      const menuElement = document.querySelector(".menu");
      if (menuElement) {
        menuElement.style.backgroundPositionY = `${event.clientY * -2.5}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // -------------------- Render The Menu -------------------- //
  return (
    <>
      <div
        className={`menu_button ${menuState} 
        ${menuButtonState}`}
        onMouseEnter={() => animateMenuButton()}
        onMouseLeave={() => animateMenuButton()}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        <div className="menu_button_text">
          {menuState === ""
            ? language === "german"
              ? "menü"
              : "menu"
            : menuState === "open"
            ? language === "german"
              ? "menü"
              : "close"
            : language === "german"
            ? "menü"
            : "menu"}
        </div>
        <div className="menu_square">
          <div></div>
          <div></div>
        </div>
      </div>
      <nav className={`menu ${menuState} ${theme === "dark" ? "dark" : ""}`}>
        <div className="interface_button">
          <div className="theme_buttons">
            {theme === "dark" ? (
              <FiSun
                onClick={() => {
                  console.log("clicked");
                  setTheme("bright");
                }}
              />
            ) : (
              <FiMoon onClick={() => setTheme("dark")} />
            )}
          </div>
          <div className="language_buttons">
            <span
              onClick={() => setLanguage("english")}
              className={`menu_item ${language === "english" ? "active" : ""}`}
            >
              en
            </span>
            <span
              onClick={() => setLanguage("german")}
              className={`menu_item ${language === "german" ? "active" : ""}`}
            >
              {language === "german" ? "de" : "ger"}
            </span>
          </div>
        </div>
        <div className="menu_items">
          <Link
            className="menu_item"
            to="/"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            {language === "german" ? "start" : "home"}
          </Link>
          <Link
            className="menu_item"
            to="/about"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            {language === "german" ? "über" : "about"}
          </Link>
          <Link
            className="menu_item"
            to="/projects"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            {language === "german" ? "projekte" : "projects"}
          </Link>
          <Link
            className="menu_item"
            to="/contact"
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            {language === "german" ? "kontakt" : "contact"}
          </Link>
          <Link
            className="menu_item download-button"
            to={
              language === "german"
                ? "./assets/Lebenslauf.pdf"
                : "./assets/CV.pdf"
            }
            onClick={() => {
              toggleMenu();
              scrollToTop();
            }}
          >
            {language === "german" ? "lebenslauf" : "cv"}
            <MdDownload className="download-icon" />
          </Link>
        </div>
        <SocialButtons />
      </nav>
    </>
  );
}
