import React, { useRef, useEffect, useState, useContext } from "react";

import { motion } from "framer-motion";

import { LanguageContext } from "../utils/LanguageContext.jsx";
import { useViewport } from "../utils/ViewportContext";

import worldtalesThumbnail from "../assets/projects/WorldTales/worldtales-1.jpg";
import worldtalesMobileThumbnail from "../assets/projects/WorldTales/worldtales-mobile-1.jpg";
import emailThumbnail from "../assets/projects/E-Mail/email1.jpg";
import networkThumbnail from "../assets/projects/network1.jpg";
import playitThumbnail from "../assets/projects/PlayIt1full.jpg";
// import gameoneThumbnail from "../assets/projects/gameone1.jpg";
import wachsdesignThumbnail from "../assets/projects/wachsdesign1.jpg";
// import itlutzThumbnail from "../assets/projects/itlutz1.jpg";
// import template1Thumbnail from "../assets/projects/template1.jpg";
import template2Thumbnail from "../assets/projects/template2.jpg";
// import portfolio1Thumbnail from "../assets/projects/portfolio1.jpg";
import prototype1Thumbnail from "../assets/projects/prototype1.jpg";
// import abbrandwächterThumbnail from "../assets/projects/abbrandwächter1.jpg";

import "../App.css";
import "./Projects.css";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);

  const [arrowState, setArrowState] = useState("");
  const [arrowDirection, setArrowDirection] = useState("");
  const [section, setSection] = useState("");

  const sliderContainerRef = useRef(null);
  const { language } = useContext(LanguageContext);

  const { width } = useViewport();
  const mobile_breakpoint = 480;
  let isMobile = width <= mobile_breakpoint;

  // -------------------- ------------ ------------------ //

  // ------------------- Projects Slider ---------------- //
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
  };

  useEffect(() => {
    const projectItems = document.querySelectorAll(".project");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(projectItems).indexOf(entry.target);
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    projectItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [sliderContainerRef]);

  // const scrollIntoView = (e) => {
  //   const projectElement = e.currentTarget;

  //   if (projectElement) {
  //     projectElement.scrollIntoView({ behavior: "smooth", inline: "center" });
  //   }
  // };

  // ---------------------- ------------- -------------------- //

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
      console.log(nextSection);

      if (nextSection === "projects_slider") {
        setArrowDirection("up");
        console.log(arrowDirection);
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
  }, []);

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
  // ---------------------- ------------- -------------------- //

  return (
    <>
      <div className="projects_container">
        <section ref={sliderContainerRef} id="projects_slider">
          <div className="slides">
            {projectData.map((data, index) => (
              <div
                key={index}
                id={`project-${index}`}
                className={`project ${index === activeIndex ? "active" : ""}`}
                style={{
                  backgroundImage: isMobile
                    ? `url(${data.mobile_img})`
                    : `url(${data.desktop_img})`,
                }}
                // onClick={(e) => scrollIntoView(e)}
              >
                {/* <iframe
                  title={`project-iframe-${index}`}
                  src={data.url}
                  width="100%"
                  height="100%"
                  className="project-iframe"
                ></iframe> */}
              </div>
            ))}
          </div>
        </section>
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

const projectData = [
  // Webapps
  {
    Name: "Worldtales",
    desktop_img: worldtalesThumbnail,
    mobile_img: worldtalesMobileThumbnail,
    url: "https://worldtales.github.io/frontend/",
    text_en:
      "<a href='https://worldtales.github.io/frontend/' class='timeline-link'>WorldTales</a>&#129133; </ br>" +
      "is a PWA (Progressive Web App) written as a SPA (Single Page Application). </ br>" +
      "The Frontend is built with React and the Backend written with Django. </ br>" +
      "It's a platform for people from around the world to share their favorite tales and stories.",
    text_de:
      "<a href='https://worldtales.github.io/frontend/' class='timeline-link'>WorldTales</a>&#129133; </ br>" +
      "ist eine PWA (Progressive Web App), die als SPA (Single Page Application) geschrieben wurde. </ br>" +
      "Das Frontend ist mit React erstellt und das Backend mit Django. </ br>" +
      "Es ist eine Plattform für Menschen aus der ganzen Welt, um ihre Lieblingsgeschichten und Erzählungen zu teilen.",
  },
  {
    Name: "Email",
    img: emailThumbnail,
    text_en: "",
    text_de: "",
  },
  {
    Name: "Social",
    img: networkThumbnail,
    text_en: "",
    text_de: "",
  },
  {
    Name: "PlayIt",
    img: playitThumbnail,
    text_en: "",
    text_de: "",
  },
  // {
  //   Name: "GameOne",
  //   img: gameoneThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  // Webdesigns
  {
    Name: "Wachsdesign",
    img: wachsdesignThumbnail,
    text_en: "",
    text_de: "",
  },
  // {
  //   Name: "ITLutz",
  //   img: itlutzThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  // {
  //   Name: "Website Template1",
  //   img: template1Thumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  {
    Name: "Website Template2",
    img: template2Thumbnail,
    text_en: "",
    text_de: "",
  },
  // {
  //   Name: "Portfolio Template",
  //   img: portfolio1Thumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  {
    Name: "Prototype",
    img: prototype1Thumbnail,
    text_en: "",
    text_de: "",
  },
  // Apps
  // {
  //   Name: "Abbrandwächter",
  //   img: abbrandwächterThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  // Others
];
