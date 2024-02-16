// import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../App.css";

export default function Logo() {
  const location = useLocation();
  const currentPage = location.pathname;

  let logoText = "";

  // Determine which logo to display based on the current page
  switch (currentPage) {
    case "/":
      logoText = "L/E";
      break;
    case "/about":
      // logoText = "Timeline";
      logoText = "L/E";
      break;
    case "/projects":
      // logoText = "Projects";
      logoText = "L/E";
      break;
    case "/contact":
      // logoText = "Contact";
      logoText = "L/E";
      break;
    default:
      // logoText = "LouisEiden";
      logoText = "L/E";
  }

  // useEffect(() => {
  //   console.log(currentPage);
  // }, [currentPage]);

  return (
    <Link to="/" className={`logo ${currentPage.substring(1)}-logo`}>
      {logoText}
    </Link>
  );
}
