import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../utils/LanguageContext.jsx";
import ScrollReveal from "../utils/ScrollReveal";

import ProgressBar from "../components/ProgressBar";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { PiFileSql } from "react-icons/pi";
import { TbApi } from "react-icons/tb";

// import louis from "../assets/louis.png";

import "../App.css";
import "./Home.css";

export default function Home() {
  const [arrowState, setArrowState] = useState("");
  const [leftArrowState, setLeftArrowState] = useState("");
  const [arrowDirection, setArrowDirection] = useState("");
  const [section, setSection] = useState("");

  const { language } = useContext(LanguageContext);

  const [elementsToReveal, setElementsToReveal] = useState([]);
  const summaryRef = useRef(null);

  useEffect(() => {
    // Update the state with the elements you want to reveal
    setElementsToReveal([
      { element: summaryRef.current, positionClass: "left_reveal" },
    ]);
  }, [summaryRef]);

  // ------------- Update Arrow when scrolling --------------- //
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop;
      const sectionHeight = window.innerHeight;
      // Determine the next section based on current scroll position
      const nextSection =
        currentScrollTop < sectionHeight
          ? "tech"
          : currentScrollTop < sectionHeight * 2
          ? "uses"
          : "home";

      setSection(nextSection);

      if (nextSection === "home") {
        setArrowDirection("up");
      } else {
        setArrowDirection((prevArrowDirection) =>
          prevArrowDirection === "" ? "" : "down"
        );
        // // Remove "down" class after 0.5 seconds
        // setTimeout(() => {
        //   if (arrowDirection === "down") {
        //     document.getElementsByClassName(".arrow").className
        //   }
        // }, 500);
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

  const animateArrowButton = (e) => {
    const arrowElement = e.currentTarget;

    if (arrowElement.classList[0] === "arrow") {
      setArrowState((prevArrowState) =>
        prevArrowState === "enter" ? "leave" : "enter"
      );
    } else {
      setLeftArrowState((prevLeftArrowState) =>
        prevLeftArrowState === "enter" ? "leave" : "enter"
      );
    }
  };

  return (
    <>
      <div className="home_container">
        <section id="home">
          <div className="summary" ref={summaryRef}>
            {language === "german" ? (
              <p className="DE">
                Als aufstrebender Junior Entwickler verfüge ich über fundierte
                Kenntnisse in der Frontend- und Backend-Entwicklung sowie eine
                Leidenschaft für innovative Technologien. Ich habe Erfahrung in
                der Gestaltung und Umsetzung ansprechender, benutzerfreundlicher
                Websites und Webanwendungen mit nahtloser Datenbankverwaltung.
                Ich arbeite gerne im Team und bin stets motiviert, meine
                Fähigkeiten zu erweitern und mich neuen Herausforderungen zu
                stellen. Gemeinsam können wir außergewöhnliche Web-Lösungen
                entwickeln, die nachhaltigen Eindruck hinterlassen.
              </p>
            ) : (
              <p className="EN">
                Hi, I am Louis, full-stack developer from Germany. 1 years of
                experience in Python, React, Node.js, and Postgres. Ready to
                create innovative web solutions!
              </p>
            )}
          </div>
          {/* <div className="picture-container">
            <img className="picture" src={louis} alt="" />
          </div> */}
        </section>
        <section id="tech">
          {/* <div className="tech_heading">tech</div> */}
          <div className="skills-wrap">
            <ProgressBar
              targetPercentage={75}
              title="HTML"
              icon={<FaIcons.FaHtml5 className="icon html" />}
            />
            <ProgressBar
              targetPercentage={70}
              title="CSS"
              icon={<FaIcons.FaCss3Alt className="icon css" />}
            />
            <ProgressBar
              targetPercentage={55}
              title="Bootstrap"
              icon={<FaIcons.FaBootstrap className="icon bootstrap" />}
            />
            <ProgressBar
              targetPercentage={65}
              title="JavaScript"
              icon={<FaIcons.FaJsSquare className="icon javascript" />}
            />
            <ProgressBar
              targetPercentage={55}
              title="React"
              icon={<FaIcons.FaReact className="icon react" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="REST"
              icon={<TbApi className="icon rest" />}
            />
            <ProgressBar
              targetPercentage={50}
              title="C++"
              icon={<SiIcons.SiCplusplus className="icon cpp" />}
            />
            <ProgressBar
              targetPercentage={55}
              title="Python"
              icon={<FaIcons.FaPython className="icon python" />}
            />
            <ProgressBar
              targetPercentage={65}
              title="Django"
              icon={<SiIcons.SiDjango className="icon django" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="SQL"
              icon={<PiFileSql className="icon sql" />}
            />
          </div>
        </section>
        <section id="uses">
          {/* <div className="uses_heading">uses</div> */}
          <div className="skills-wrap">
            <ProgressBar
              targetPercentage={50}
              title="Docker"
              icon={<FaIcons.FaDocker className="icon docker" />}
            />
            <ProgressBar
              targetPercentage={55}
              title="Github"
              icon={<FaIcons.FaGithub className="icon github" />}
            />
            <ProgressBar
              targetPercentage={40}
              title="Figma"
              icon={<FaIcons.FaFigma className="icon figma" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Node"
              icon={<FaIcons.FaNode className="icon node" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Postgresql"
              icon={<SiIcons.SiPostgresql className="icon postgresql" />}
            />
            <ProgressBar
              targetPercentage={65}
              title="Openai"
              icon={<SiIcons.SiOpenai className="icon openai" />}
            />
            <ProgressBar
              targetPercentage={85}
              title="Chrome"
              icon={<SiIcons.SiGooglechrome className="icon chrome" />}
            />
            <ProgressBar
              targetPercentage={80}
              title="Firefox"
              icon={<FaIcons.FaFirefox className="icon firefox" />}
            />
            <ProgressBar
              targetPercentage={75}
              title="Linux"
              icon={<FaIcons.FaLinux className="icon linux" />}
            />
            <ProgressBar
              targetPercentage={85}
              title="Windows"
              icon={<FaIcons.FaWindows className="icon windows" />}
            />
            {/* 
            <ProgressBar
              targetPercentage={45}
              title="Postman"
              icon={<SiIcons.SiPostman className="icon postman" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Arduino"
              icon={<SiIcons.SiArduino className="icon arduino" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="RaspberryPi"
              icon={<FaIcons.FaRaspberryPi className="icon raspberrypi" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="VSCode"
              icon={<SiIcons.SiVisualstudiocode className="icon visualstudiocode" />}
            /> 
            <ProgressBar
              targetPercentage={45}
              title="Android Studio"
              icon={<SiIcons.SiAndroidstudio className="icon androidstudio" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Adobe Photoshop"
              icon={<SiIcons.SiAdobephotoshop className="icon adobephotoshop" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Adobe Illustrator"
              icon={<SiIcons.SiAdobeillustrator className="icon adobeillustrator" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Adobe Xd"
              icon={<SiIcons.SiAdobexd className="icon adobexd" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Gunicorn"
              icon={<SiIcons.SiGunicorn className="icon gunicorn" />}
            />
            <ProgressBar
              targetPercentage={45}
              title="Nginx"
              icon={<SiIcons.SiNginx className="icon nginx" />}
            /> */}
          </div>
        </section>
        <div className={`arrow_container ${arrowDirection}`}>
          {" "}
          {/* <p
            onMouseEnter={(e) => animateArrowButton(e)}
            onMouseLeave={(e) => animateArrowButton(e)}
            onClick={scrollToNextSection}
          >
            {section}
          </p> */}
          <div
            className={`arrow ${arrowState}`}
            onMouseEnter={(e) => animateArrowButton(e)}
            onMouseLeave={(e) => animateArrowButton(e)}
            onClick={scrollToNextSection}
          ></div>
        </div>
        <Link to="/projects">
          <div className="arrow_left_container">
            {/* <p
              onMouseEnter={(e) => animateArrowButton(e)}
              onMouseLeave={(e) => animateArrowButton(e)}
            >
              projects
            </p> */}
            <div
              className={`arrow_left ${leftArrowState}`}
              onMouseEnter={(e) => animateArrowButton(e)}
              onMouseLeave={(e) => animateArrowButton(e)}
            ></div>
          </div>
        </Link>
      </div>
      {elementsToReveal && <ScrollReveal elements={elementsToReveal} />}
    </>
  );
}