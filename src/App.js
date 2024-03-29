import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./utils/LanguageContext";
import { ThemeProvider } from "./utils/ThemeContext";
import { ViewportProvider } from "./utils/ViewportContext";

// import Logo from "./components/Logo";
// import Footer from "./navigation/Footer";
import Menu from "./navigation/Menu";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import "./App.css";

export default function App() {
  // Parallax Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.backgroundPositionY = `${
        window.scrollY * -5
      }px`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ViewportProvider>
          <HashRouter>
            {/* <Logo /> */}
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            {/* <Footer /> */}
          </HashRouter>
        </ViewportProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
