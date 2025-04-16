import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const sliderContainerRef = useRef(null);
  const { language } = useContext(LanguageContext);

  const { width } = useViewport();
  const mobile_breakpoint = 480;
  let isMobile = width <= mobile_breakpoint;

  // ------------------- Projects Slider ---------------- //
  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    }),
    []
  );

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const container = sliderContainerRef.current;
      if (container) {
        const scrollAmount = e.deltaY;
        const newPosition = scrollPosition + scrollAmount;

        // Ensure we don't scroll past the bounds of the container
        const maxScroll = container.scrollWidth - container.clientWidth;
        const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));

        setScrollPosition(clampedPosition);
        container.scrollTo({
          left: clampedPosition,
          behavior: "smooth",
        });
      }
    },
    [scrollPosition]
  );

  useEffect(() => {
    const sliderContainer = sliderContainerRef.current;
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

    if (sliderContainer) {
      sliderContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      observer.disconnect();
      if (sliderContainer) {
        sliderContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel, observerOptions]);

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
        <section
          ref={sliderContainerRef}
          id="projects_slider"
          onWheel={handleWheel}
        >
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
                onClick={scrollToNextSection}
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
  //   Name: "Raspian MySQL 4.2",
  //   desktop_img: "assets/projects/Raspian MySQL 4.2/raspian-mysql-4.2-1.png",
  //   mobile_img: "assets/projects/Raspian MySQL 4.2/raspian-mysql-4.2-1.png",
  //   text_en: "Raspian MySQL 4.2",
  //   text_de: "Raspian MySQL 4.2",
  // },
  {
    Name: "Abbrandwächter",
    desktop_img: "/assets/projects/abbrandsensor/abbrandsensor-1.jpg",
    mobile_img: "/assets/projects/abbrandsensor/abbrandsensor-1.jpg",
    text_en:
      'The "Abbrandwächter" is an IoT Device based on an ESP8266. ' +
      'The project is still "work in Progress". ' +
      "Currently I am figuring out the power supply, there are several options: " +
      "1. a Peltier element " +
      "2. a simple power supply" +
      "3. a battery" +
      "each has its own advantages and disadvantages." +
      "Besides that the App needs a Settings page to configure the WiFi and threshold temperature." +
      "The App is written in React Native." +
      "The ESP is programmed in C++." +
      "App and ESP are connected via Websocket." +
      "The temperature is measured with an K-Type Temperature sensor Connected drirectly to the ESP." +
      "Working range: -100°C - 1250°C with a Stainless steel braid Cable outer shield" +
      "The App connects automatically to the WiFi of the ESP (if present) to set the WiFi Credentials.(TODO: this Page is not done yet!)" +
      "Context: The ESP is programmed to only start a Wifi AP if no other WiFi connection is available or he has no WiFi Credentials stored." +
      "There is also a http-server running on the ESP to configure the Wifi Connection." +
      "As soon as the Wifin Data is set and a connection is established the ESP disables his Wifi AP and connects directly to the Wifi. " +
      "When the wifi connection is established the App proceeds to connect to the ESP Websocket connection using it's MDNS name." +
      "The ESP sends the temperature data to the App via Websocket." +
      "The App displays the temperature and the status of the device. alternatively you can visit the <a href='https://abbrandwächter.de' class='link'>Webpage</a><span class='link-arrow'>&#129133;</span> of the device." +
      "The ESP has also a built in button and piezo buzzer to take a threshold temperature and notify the user if the threshold temperature fell below .",
    text_de:
      'Der "Abbrandwächter" ist ein IoT-Gerät, das auf einem ESP8266 basiert. ' +
      'Das Projekt befindet sich noch "in Entwicklung". ' +
      "Derzeit arbeite ich an der Stromversorgung, für die es mehrere Optionen gibt: " +
      "1. ein Peltier-Element " +
      "2. ein einfaches Netzteil " +
      "3. eine Batterie " +
      "jede Option hat ihre eigenen Vor- und Nachteile. " +
      "Außerdem benötigt die App noch eine Einstellungsseite zur Konfiguration des WLANs und der Schwellentemperatur. " +
      "Die App ist in React Native geschrieben. " +
      "Der ESP ist in C++ programmiert. " +
      "App und ESP sind über Websocket verbunden. " +
      "Die Temperatur wird mit einem K-Typ Temperatursensor gemessen, der direkt mit dem ESP verbunden ist. " +
      "Arbeitsbereich: -100°C - 1250°C mit einem Edelstahl-Ummantelungskabel. " +
      "Die App verbindet sich automatisch mit dem WLAN des ESP (falls vorhanden), um die WLAN-Zugangsdaten einzurichten. (TODO: Diese Seite ist noch nicht fertig!) " +
      "Kontext: Der ESP ist so programmiert, dass er nur dann einen WLAN-AP startet, wenn keine andere WLAN-Verbindung verfügbar ist oder keine WLAN-Zugangsdaten gespeichert sind. " +
      "Auf dem ESP läuft auch ein HTTP-Server zur Konfiguration der WLAN-Verbindung. " +
      "Sobald die WLAN-Daten eingerichtet sind und eine Verbindung hergestellt ist, deaktiviert der ESP seinen WLAN-AP und verbindet sich direkt mit dem WLAN. " +
      "Wenn die WLAN-Verbindung hergestellt ist, verbindet sich die App über den MDNS-Namen mit der ESP-Websocket-Verbindung. " +
      "Der ESP sendet die Temperaturdaten über Websocket an die App. " +
      "Die App zeigt die Temperatur und den Status des Geräts an. Alternativ können Sie auch die <a href='https://abbrandwächter.de' class='link'>Webseite</a><span class='link-arrow'>&#129133;</span> des Geräts besuchen. " +
      "Der ESP verfügt außerdem über einen eingebauten Taster und Summer, um eine Schwellentemperatur festzulegen und den Benutzer zu benachrichtigen, wenn die Schwellentemperatur unterschritten wird.",
  },
  {
    Name: "Qrush Webapp",
    desktop_img: "/assets/projects/qrushwebapp/qrush1.png",
    mobile_img: "/assets/projects/qrushwebapp/qrush1.png",
    text_en: "Qrush Webapp",
    text_de: "Qrush Webapp",
  },
];
