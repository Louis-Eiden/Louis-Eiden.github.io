import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// import Logo from "../components/Logo";

import { LanguageContext } from "../utils/LanguageContext.jsx";
import { useViewport, useOrientation } from "../utils/ViewportContext";

// import ScrollReveal from "../utils/ScrollReveal";

import ProgressBar from "../components/ProgressBar";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { FaAngleDown } from "react-icons/fa6";
import { PiFileSql } from "react-icons/pi";
import { TbApi } from "react-icons/tb";

// import louis from "../assets/louis.png";

import "../App.css";
import "./Home.css";

export default function Home() {
  const [arrowState, setArrowState] = useState("");
  // const [leftArrowState, setLeftArrowState] = useState("");
  const [arrowDirection, setArrowDirection] = useState("");
  const [section, setSection] = useState("");

  const { language } = useContext(LanguageContext);

  const { width } = useViewport();
  const orientation = useOrientation();
  const mobile_breakpoint = 480;
  let isMobile = width <= mobile_breakpoint;

  useEffect(() => {
    console.log(orientation);
  }, [orientation]);

  // const [elementsToReveal, setElementsToReveal] = useState([]);
  // const summaryRef = useRef(null);

  // useEffect(() => {
  //   // Update the state with the elements you want to reveal
  //   setElementsToReveal([
  //     { element: summaryRef.current, positionClass: "left_reveal" },
  //   ]);
  //   console.log(elementsToReveal);
  // }, [summaryRef]);

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
      // } else {
      //   setLeftArrowState((prevLeftArrowState) =>
      //     prevLeftArrowState === "enter" ? "leave" : "enter"
      //   );
    }
  };

  const mobileAngleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="logo"
      >
        <Link to="/">L/E</Link>
      </motion.div>
      <div className="home_container">
        <section id="home">
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? "-40%" : "-40%",
              x: isMobile ? -100 : 100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="summary"
          >
            {/* First determine content based on language and mobile status */}
            {language === "german" ? (
              <>
                {/* German content */}
                {width < 651 ||
                (width <= 1024 && orientation === "landscape") ? (
                  <p className="DE">
                    Full-Stack Junior Mobile- und Web-Entwickler mit Expertise
                    in React, Node.js sowie Arduino und ESP8266-Systemen. Ich
                    entwickle seit 2022 responsive Webanwendungen und clevere
                    IoT-Lösungen, die durch sauberen Code und durchdachte
                    Konzepte überzeugen. Technische Vielseitigkeit trifft auf
                    Leidenschaft für innovative Problemlösungen.
                  </p>
                ) : (
                  <p className="DE">
                    Als vielseitiger Junior Entwickler verbinde ich mit
                    Begeisterung digitale und physische Realitäten durch
                    innovative Programmierung. Seit 2022 konzentriere ich mich
                    auf die Entwicklung zuverlässiger Webanwendungen mit React,
                    Node.js und TypeScript, während ich gleichzeitig
                    Embedded-Systeme mit Arduino, PIC-Mikrocontrollern und
                    ESP8266 konstruiere. Mein Expertise-Spektrum umfasst
                    Full-Stack-Webentwicklung, mobile Anwendungen, IoT-Projekte
                    und Serverkonfiguration – stets mit technischer Kreativität
                    umgesetzt. Ich verbinde zeitgemäße Entwicklungsansätze mit
                    pragmatischen Lösungsstrategien, um plattformübergreifende
                    Systeme zu schaffen, die durch ihre Effizienz und
                    Benutzerfreundlichkeit überzeugen.
                  </p>
                )}
              </>
            ) : (
              <>
                {/* English content */}
                {width < 651 ||
                (width <= 1024 && orientation === "landscape") ? (
                  <p className="EN">
                    Full-stack Junior Developer crafting web apps with React &
                    Node.js while building embedded solutions with Arduino &
                    ESP8266. From responsive websites to custom IoT devices, I
                    deliver creative solutions that bridge digital and physical
                    worlds. Passionate about clean code and practical
                    problem-solving since 2022.
                  </p>
                ) : (
                  <p className="EN">
                    Hi, I'm a versatile Junior Developer passionate about
                    bridging the digital and physical worlds through code. Since
                    2022, I've been crafting robust web applications with React,
                    Node.js, and TypeScript while also building embedded
                    solutions using Arduino, PIC microcontrollers, and ESP8266
                    devices. From full-stack web development and mobile apps to
                    IoT solutions and server configuration, I bring technical
                    creativity to every project. Whether you need a responsive
                    web application, a custom IoT device, or help with legacy
                    systems integration, I combine modern development practices
                    with practical problem-solving to deliver solutions that
                    work seamlessly across platforms.
                  </p>
                )}
              </>
            )}
          </motion.div>
          {/* <div className="picture-container">
            <img className="picture" src={louis} alt="" />
          </div> */}
          {/* Separate conditional for the mobile angle that applies to both languages */}
          {width < 378 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate="visible"
              variants={mobileAngleVariants}
              transition={{ duration: 1, delay: 1 }}
              className="mobile-angle"
            >
              <p onClick={scrollToNextSection}>
                {language === "german"
                  ? "hier gehts weiter"
                  : "scroll for more"}
              </p>
              <p>
                <FaAngleDown />
              </p>
            </motion.div>
          )}
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
          {/* <p
            onMouseEnter={(e) => animateArrowButton(e)}
            onMouseLeave={(e) => animateArrowButton(e)}
            onClick={scrollToNextSection}
          >
            {section}
          </p> */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -135 }}
            animate={{ opacity: 1, y: [20, -20, 0] }}
            transition={{ duration: 1 }}
            className={`arrow ${arrowState}`}
            onMouseEnter={(e) => animateArrowButton(e)}
            onMouseLeave={(e) => animateArrowButton(e)}
            onClick={scrollToNextSection}
          ></motion.div>
        </div>
        {/*<Link to="/projects">
          <div className="arrow_left_container">
            <p
              onMouseEnter={(e) => animateArrowButton(e)}
              onMouseLeave={(e) => animateArrowButton(e)}
            >
              projects
            </p>
            <div
              className={`arrow_left ${leftArrowState}`}
              onMouseEnter={(e) => animateArrowButton(e)}
              onMouseLeave={(e) => animateArrowButton(e)}
            ></div>
          </div>
        </Link> */}
      </div>
      {/* {elementsToReveal && <ScrollReveal elements={elementsToReveal} />} */}
    </>
  );
}
