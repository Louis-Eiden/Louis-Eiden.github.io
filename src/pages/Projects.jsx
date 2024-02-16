import React, { useRef, useEffect, useState, useContext } from "react";

import { motion } from "framer-motion";

import { LanguageContext } from "../utils/LanguageContext.jsx";
import { useViewport } from "../utils/ViewportContext";

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
  // ----------------------------- Webapps ----------------------------- //
  {
    Name: "Worldtales",
    desktop_img: "assets/projects/WorldTales/worldtales-1.jpg",
    mobile_img: "assets/projects/WorldTales/worldtales-mobile-1.jpg",
    url: "https://worldtales.github.io/frontend/",
    youtube: "https://www.youtube.com/watch?v=4pRY0_Y7Jb0",
    text_en:
      "<a href='https://worldtales.github.io/frontend/' class='link'>WorldTales</a><span class='link-arrow'>&#129133;</span> " +
      "is a PWA (Progressive Web App) written as a SPA (Single Page Application). " +
      "The Frontend is built with React and the Backend written with Django. " +
      "It's a platform for people from around the world to share their favorite tales and stories. " +
      "The backend is hosted on Pythonanywhere and the frontend via Github Pages. " +
      "Here is the <a href='https://github.com/Louis-Eiden/WorldTales' class='link'>GitHub-repository</a><span class='link-arrow'>&#129133;</span>",
    text_de:
      "<a href='https://worldtales.github.io/frontend/' class='link'>WorldTales</a><span class='link-arrow'>&#129133;</span> " +
      "ist eine PWA (Progressive Web App), die als SPA (Single Page Application) geschrieben wurde. " +
      "Das Frontend ist mit React erstellt und das Backend mit Django. " +
      "Es ist eine Plattform für Menschen aus der ganzen Welt, um ihre Lieblingsgeschichten und Erzählungen zu teilen. " +
      "Das Backend ist auf PythonAnywhere gehostet und das Frontend über GitHub Pages verfügbar. " +
      "Hier die <a href='https://github.com/Louis-Eiden/WorldTales' class='link'>GitHub-Repository</a><span class='link-arrow'>&#129133;</span>",
  },
  {
    Name: "Email",
    desktop_img: "assets/projects/e-mail/email-3.jpg",
    // mobile_img: "assets/projects/E-Mail/email-mobile-1.jpg",
    text_en:
      "Introducing Email - a dynamic messaging web app developed as my third project in Harvard's CS50Web programming course. " +
      "Crafted with Django and JavaScript, it showcases advanced web development skills " +
      "and seamless integration for a user-friendly experience. Explore the features and " +
      "design that reflect my commitment to delivering robust web solutions.",
    text_de:
      "Email – einer lebendigen Messaging-Webanwendung, entstanden als mein drittes Projekt " +
      "im CS50Web-Programmierkurs an der Harvard-Universität. Entwickelt mit Django und JavaScript, " +
      "demonstriert sie meine fortgeschrittenen Fähigkeiten in der Webentwicklung " +
      "und gewährleistet eine nahtlose Integration für eine benutzerfreundliche Erfahrung.",
  },
  // {
  //   Name: "Social",
  //   desktop_img: networkThumbnail,
  //   // mobile_img: networkMobileThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  {
    Name: "PlayIt",
    desktop_img: "assets/projects/playit/playit-1.jpg",
    mobile_img: "assets/projects/playit/playit-mobile-1.jpg",
    text_en:
      "Introducing <a href='https://louis-eiden.github.io/PlayIt/' class='link'>PlayIt</a><span class='link-arrow'>&#129133;</span>, a soundboard application crafted with HTML, CSS, and JavaScript. " +
      "With PlayIt, you have the flexibility to assign songs from your phone or computer, or even record your own audio clips. " +
      "Explore the interactive features and enjoy a dynamic audio experience with this project.",
    text_de:
      "Entdecke <a href='https://louis-eiden.github.io/PlayIt/' class='link'>PlayIt</a><span class='link-arrow'>&#129133;</span>, eine Soundboard-Anwendung, entwickelt mit HTML, CSS und JavaScript. " +
      "Mit PlayIt kannst du Songs von deinem Smartphone oder Computer zuweisen oder sogar eigene Audioaufnahmen machen. " +
      "Erlebe die interaktiven Funktionen und genieße eine dynamische Audioerfahrung mit diesem Projekt.",
  },
  // {
  //   Name: "GameOne",
  //   img: gameoneThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
  // ----------------------------- Webdesigns ----------------------------- //
  // {
  //   Name: "Wachsdesign",
  //   desktop_img: "",
  //   // mobile_img: "",
  //   text_en: "",
  //   text_de: "",
  // },
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
    Name: "Schwimmschule Waterproof",
    desktop_img: "assets/projects/Waterproof/waterproof-1.jpg",
    mobile_img: "assets/projects/Waterproof/waterproof-mobile-1.jpg",
    url: "https://louis-eiden.github.io/Waterproof/",

    text_en:
      "This Swim School's website reflects my commitment to creating visually appealing, user-friendly, " +
      "and interactive web experiences. From responsive design to seamless navigation and engaging animations, " +
      "this project showcases my skills in HTML, CSS, JavaScript, JQuery, and ScrollReveal. " +
      "Explore the website and take a virtual plunge into the world of <a href='https://louis-eiden.github.io/Waterproof/' class='link'>Waterproof</a><span class='link-arrow'>&#129133;</span> Swim School!",
    text_de:
      "Die Website wurde mit HTML, CSS und JavaScript erstellt, wobei jQuery und ScrollReveal " +
      "für zusätzliche Interaktivität und ansprechende Animationen sorgen. Die Benutzeroberfläche wurde bewusst " +
      "benutzerfreundlich gestaltet, um eine angenehme Erfahrung für alle Besucher zu gewährleisten." +
      "Besuche die Webseite und tauche ein in die welt der <a href='https://louis-eiden.github.io/Waterproof/' class='link'>Waterproof</a><span class='link-arrow'>&#129133;</span> Schwimmschule.",
  },
  {
    Name: "Website Template2",
    desktop_img: "assets/projects/Template-2/template-2.jpg",
    mobile_img: "assets/projects/Template-2/template-2-mobile-1.jpg",
    url: "assets/projects/Template-2/index.html",
    text_en:
      "A website <a href='assets/projects/Template-2/index.html' class='link'>template</a><span class='link-arrow'>&#129133;</span> crafted with HTML, CSS, and JavaScript. " +
      "It features a custom-made Parallax effect implemented using JavaScript. " +
      "The graphics were created using Photoshop Version 22.4. " +
      "Foto by Irina Iriser: <a href='https://www.pexels.com/de-de/foto/tilt-shift-lens-foto-von-blauen-blumen-673857/' class='link'>Source</a><span class='link-arrow'>&#129133;</span>",
    text_de:
      "Ein <a href='assets/projects/Template-2/index.html' class='link'>Website-Template</a><span class='link-arrow'>&#129133;</span>, geschrieben mit HTML, CSS und JavaScript. " +
      "Verwendet einen Parallaxen-Effekt, der vollständig mit JavaScript erstellt wurde. " +
      "Die Grafiken wurden mithilfe von Photoshop Version 22.4 erstellt. " +
      "Foto von Irina Iriser: <a href='https://www.pexels.com/de-de/foto/tilt-shift-lens-foto-von-blauen-blumen-673857/' class='link'>Quelle</a><span class='link-arrow'>&#129133;</span>",
  },
  {
    Name: "Portfolio Template",
    desktop_img: "assets/projects/portfolio-template/portfolio-template-1.jpg",
    mobile_img:
      "assets/projects/portfolio-template/portfolio-template-mobile-1.jpg",
    url: "https://louis-eiden.github.io/Portfolio-1/",

    text_en:
      "A portfolio <a href='https://louis-eiden.github.io/Portfolio-1/' class='link'>template</a><span class='link-arrow'>&#129133;</span> crafted utilizing HTML, CSS, JavaScript, SwiperJS, and ScrollReveal. " +
      "Explore the showcase of skills and projects in a visually appealing and interactive layout. " +
      "This template reflects my proficiency in web development and design.",
    text_de:
      "Ein <a href='https://louis-eiden.github.io/Portfolio-1/' class='link'>Portfolio-Template</a><span class='link-arrow'>&#129133;</span> erstellt mit HTML, CSS, JavaScript, SwiperJS und ScrollReveal. " +
      "Erkunde die Präsentation von Fähigkeiten und Projekten in einem visuell ansprechenden " +
      "und interaktiven Layout. Diese Vorlage spiegelt meine Kompetenz in der Webentwicklung " +
      "und im Design wieder.",
  },

  // {
  //   Name: "Prototype",
  //   desktop_img: "",
  //   mobile_img: "",
  //   text_en: "",
  //   text_de: "",
  // },
  // ----------------------------- Apps ----------------------------- //
  // {
  //   Name: "Abbrandwächter",
  //   // desktop_img: abbrandwächterThumbnail,
  //   // mobile_img: abbrandwächterMobileThumbnail,
  //   text_en: "",
  //   text_de: "",
  // },
];
