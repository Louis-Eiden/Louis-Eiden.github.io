// TODO: when going back to the Portfolio-website from a projects site it should open at the place, in the slider, of the project the using is coming back from.

import React, {
  useEffect,
  useState,
  useContext
} from "react";
import { motion } from "framer-motion";

import { LanguageContext } from "../utils/LanguageContext.jsx";
import { useViewport } from "../utils/ViewportContext";
import { ProjectsSlider } from "../components/ProjectsSlider";

import "../App.css";
import "./Projects.css";

import { projectData } from "../data/ProjectData.js";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [arrowState, setArrowState] = useState("");
  const [arrowDirection, setArrowDirection] = useState("");
  const [section, setSection] = useState("");

  const { language } = useContext(LanguageContext);
  const { width } = useViewport();
  const mobile_breakpoint = 480;
  let isMobile = width <= mobile_breakpoint;

  // TODO: Add another View using cards and a grid or flexbox layout

  // ------------- Arrow Animation --------------- //
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop;
      const sectionHeight = window.innerHeight;
      // Determine the next section based on current scroll position
      const nextSection =
        currentScrollTop < sectionHeight
          ? "project_details"
          : "projects_slider";

      setSection(nextSection);

      if (nextSection === "projects_slider") {
        setArrowDirection("up");
      } else {
        setArrowDirection((prevArrowDirection) =>
          prevArrowDirection === "" ? "" : "down"
        );
      }
    };

    handleScroll();

    // Attach the event listener when the component mounts
    document.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [arrowDirection]);

  const scrollToNextSection = () => {
    const nextSectionElement = document.getElementById(section);

    if (nextSectionElement) {
      nextSectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const animateArrowButton = () => {
    setArrowState((prevArrowState) =>
      prevArrowState === "enter" ? "leave" : "enter"
    );
  };

  return (
    <>
      <div className="projects_container">
        {/* TODO: make the slider a seperate component.*/}
        <ProjectsSlider 
          activeIndex={activeIndex} 
          setActiveIndex={setActiveIndex} 
          onProjectClick={scrollToNextSection}
        />

        {/* TODO: We need more sections max is 6 lines per section*/}

        <section id="project_details">
          {projectData.map((data, index) => (
            <div
              key={index}
              className={`project-details ${
                index === activeIndex ? "active" : ""
              }`}
            >
              {index === activeIndex && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: isMobile ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="description"
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          language === "english" ? data.text_en : data.text_de,
                      }}
                    />
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </section>
        {/* TODO: add the hover effect to the background rather than to the arrow lines*/}
        <div className={`arrow_container ${arrowDirection}`}>
          {/* <p
            onMouseEnter={animateArrowButton}
            onMouseLeave={animateArrowButton}
            onClick={scrollToNextSection}
          >
            {arrowDirection === "up" ? "to the top" : "explore more"}
          </p> */}
          <div
            className={`arrow ${arrowState}`}
            onMouseEnter={animateArrowButton}
            onMouseLeave={animateArrowButton}
            onClick={scrollToNextSection}
          ></div>
        </div>
      </div>
    </>
  );
}
