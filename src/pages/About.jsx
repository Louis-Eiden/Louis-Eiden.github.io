import React, { useRef, useEffect, useState, useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext.jsx";

import "../App.css";
import "./About.css";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);
  const { language } = useContext(LanguageContext);

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8, // Adjust as needed
  };

  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timestamp");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(timelineItems).indexOf(entry.target);
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [timelineRef]);

  return (
    <>
      <div className="about_container">
        <div className="timeline_container" ref={timelineRef}>
          <div className="timeline">
            <div className="line">
              {timelineData.map((data, index) => (
                <div
                  key={index}
                  className={`timestamp ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="dot"></div>
                  <div className="year">{data.year}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="timeline_details">
            {timelineData.map((data, index) => (
              <div
                key={index}
                className={`details ${index === activeIndex ? "active" : ""}`}
              >
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html:
                      language === "english" ? data.text_en : data.text_de,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const timelineData = [
  {
    year: "2006-2012",
    text_en:
      "High School Diploma Realschule in Eisenberg, Rhineland-Palatinate, Germany. <br />" +
      "Elective: Computer Science and Technology.",
    text_de:
      "Realschulabschluss an der Realschule in Eisenberg, Rheinland-Pfalz, Deutschland. <br />" +
      "Wahlfach: Informatik und Technik.",
  },
  {
    year: "2012-2015",
    text_en:
      "Apprenticeship at the company <a href='http://www.itlutz.de/homepage/index.html' class='timeline-link'>Informationstechnik Lutz</a> in Gehrweiler, Rhineland-Palatinate, Germany. <br />" +
      "Attended Vocational School <a href='https://bbs1-kl.de/' class='timeline-link'>BBS1-KL</a>in Kaiserslautern, Rhineland-Palatinate, Germany. <br />" +
      "More information about the profession <a class='timeline-link' href='https://www.dqr.de/dqr/shareddocs/qualifikationen-neu/en/Information-electronics-technician-m-f-equipment-and-systems-technology.html'>here</a>",
    text_de:
      "Ausbildung bei der Firma <a href='http://www.itlutz.de/homepage/index.html' class='timeline-link'>Informationstechnik Lutz</a> in Gehrweiler, Rheinland-Pfalz, Deutschland. <br />" +
      "Besuch der Berufsschule <a href='https://bbs1-kl.de/' class='timeline-link'>BBS1-KL</a> in Kaiserslautern, Rheinland-Pfalz, Deutschland.<br />" +
      "Mehr informationen zum Berufsbild <a href='https://www.dqr.de/dqr/shareddocs/qualifikationen-neu/de/Informationselektroniker-Schwerpunkt-Geraete-Informations-und-Buerosystemtechnik-Informationselektronikerin-Schwerpunkt-Geraete-Informations-und-Buerosystemtechnik.html' class='timeline-link'>hier</a>",
  },
  {
    year: "2015-2017",
    text_en:
      "Engaged in diverse job opportunities for several months on <br />" +
      "farms and other work settings, contributing to the local <br />" +
      "communities while gaining valuable life experiences. <br />" +
      "During this enriching journey, I had the chance to immerse <br />" +
      "myself in different cultures, enhancing my English <br />" +
      "language skills through meaningful interactions with <br />" +
      "people from various backgrounds. The experience of living <br />" +
      "and working in foreign countries allowed me to develop a <br />" +
      "deeper appreciation for global diversity and cultivate <br />" +
      "intercultural connections that have enriched my worldview.",
    text_de:
      "Während meines Aufenthalts in Südostasien und Neuseeland <br />" +
      "habe ich über mehrere Monate hinweg vielfältige <br />" +
      "Tätigkeiten auf Farmen und in anderen Arbeitsumgebungen <br />" +
      "ausgeübt, wodurch ich aktiv zur lokalen Gemeinschaft <br />" +
      "beitrug und wertvolle Lebenserfahrungen sammelte. Während <br />" +
      "dieser bereichernden Reise hatte ich die Chance, mich in <br />" +
      "verschiedene Kulturen einzutauchen und meine <br />" +
      "Englischkenntnisse durch bedeutsame Interaktionen mit <br />" +
      "Menschen aus unterschiedlichen Hintergründen zu <br />" +
      "verbessern. Das Leben und Arbeiten in fremden Ländern <br />" +
      "erlaubte mir, eine tiefere Wertschätzung für die globale <br />" +
      "Vielfalt zu entwickeln und interkulturelle Verbindungen zu <br />" +
      "knüpfen, die mein Weltbild bereichert haben.",
  },
  {
    year: "2017-2018",
    text_en:
      "Completed technical studies at vocational school <a href='https://www.t1.bbslu.de/schulformen/berufsoberschule-bos-1/' class='timeline-link'>BOS1-LU</a> in Ludwigshafen, Rhineland-Palatinate, Germany.",
    text_de:
      "Besuch der Berufsoberschule <a href='https://www.t1.bbslu.de/schulformen/berufsoberschule-bos-1/' class='timeline-link'>BOS1-LU</a> in Ludwigshafen, Rheinland-Pfalz, Deutschland",
  },
  {
    year: "2018-2019",
    text_en:
      "<ul>" +
      "<li>Troubleshooted and resolved issues with laptops and <br />" +
      "mobile via remote support and on-site. Created help desk tickets." +
      "</li>" +
      "<li>Trained and supported end-users with software, hardware <br />" +
      "and network standards and use processes." +
      "</li>" +
      "<li>Assisted customers with product selection based on <br />" +
      "stated needs, proposed use, and budget." +
      "</li>" +
      "<li>Installed and configured software and hardware for <br />" +
      "optimal performance." +
      "</li>" +
      "</ul>",
    text_de:
      "<ul>" +
      "<li>Fehlersuche an Laptops und mobilen Geräten über <br />" +
      "Fernwartung und vor Ort. Erstellen von Helpdesk-Tickets." +
      "</li>" +
      "<li>Unterstützung von Endbenutzern bei der Einhaltung von <br />" +
      "Software-, Hardware- und Netzwerkstandards." +
      "</li>" +
      "<li>Hilfe bei der Produktauswahl von Software und Hardware <br />" +
      "auf Basis der Anforderungen, des vorgesehenen Einsatzes und des Budgets." +
      "</li>" +
      "<li>Installation und Konfiguration von Software und Hardware <br />" +
      "für optimale Leistung." +
      "</li>" +
      "</ul>",
  },
  {
    year: "2020-2022",
    text_en:
      "<ul>" +
      "<li>Granting permissions and access rights through Exchange Online <br />" +
      "and Active Directory.</li>" +
      "<li>Maintaining server hardware and software components.</li>" +
      "<li>Implementing new hardware and software solutions on both <br />" +
      "server and client sides.</li>" +
      "<li>Creating step-by-step guides and documentation.</li>" +
      "<li>Organizing training sessions for new employees.</li>" +
      "<li>Defined and documented technical support best practices.</li>" +
      "<li>Deploying updates and patches for Windows workstations.</li>" +
      "<li>Configuring SCCP and SIP Cisco phones using <br />" +
      "Cisco Unified Communications Manager (CUCM).</li>" +
      "</ul>",
    text_de:
      "<ul>" +
      "<li>Gewährung von Berechtigungen und Zugriffsrechten über <br />" +
      "Exchange Online und Active Directory.</li>" +
      "<li>Wartung von Server-Hardware- und Softwarekomponenten.</li>" +
      "<li>Implementierung neuer Hardware- und Softwarelösungen <br />" +
      "auf Server- und Client-Seite.</li>" +
      "<li>Erstellen von Schritt-für-Schritt-Anleitungen.</li>" +
      "<li>Organisation von Schulungen für neue Mitarbeiter.</li>" +
      "<li>Definieren und dokumentieren von Best Practices <br />" +
      "für den technischen Support.</li>" +
      "<li>Bereitstellung von Updates und Patches <br />" +
      "für Windows Arbeitsstationen.</li>" +
      "<li>Konfiguration von SCCP und SIP Cisco-Telefonen <br />" +
      "mit Cisco Unified Communications Manager (CUCM).</li>" +
      "</ul>",
  },
  {
    year: "2020-2022",
    text_en:
      "<ul>" +
      "<li>Analyzed Hardware and Software issues to identify <br />" +
      "troubleshooting methods needed for quick remediation.</li>" +
      "<li>Documented all transactions and support interactions <br />" +
      "in Ticketing system for future reference and addition to knowledge base.</li>" +
      "<li>Explained technical information in clear terms <br />" +
      "to non-technical individuals to promote better understanding.</li>" +
      "<li>Assembly and commissioning of end-user workstations and <br />" +
      "setup of laboratory workstations and small servers.</li>" +
      "<li>Update Management via Windows Server Update Services WSUS.</li>" +
      "</ul>",
    text_de:
      "<ul>" +
      "<li>Beheben von Hardware- und Softwareproblemen an Desktops, <br />" +
      "Laptops, Druckern und mobilen Geräten über Fernwartung und vor Ort.</li>" +
      "<li>Dokumentation aller Schritte im Ticketing-System <br />" +
      "für zukünftige Referenz und Ergänzung der Datenbank.</li>" +
      "<li>Endbenutzern den fachgerechten Umgang mit Software und Hardware erklären.</li>" +
      "<li>Montage und Inbetriebnahme von Endbenutzer-Arbeitsstationen und <br />" +
      "Einrichtung von Laborarbeitsstationen und kleinen Servern.</li>" +
      "<li>Update-Management über Windows Server Update Services WSUS.</li>" +
      "</ul>",
  },
  {
    year: "2022-2023",
    text_en:
      "As an enthusiastic builder and DIY enthusiast, I undertook <br />" +
      "the ambitious project of designing and constructing a Tiny <br />" +
      "House from the ground up. This hands-on experience allowed <br />" +
      "me to develop strong skills in carpentry, construction, <br />" +
      "and project management. From planning the layout and <br />" +
      "designing the space-efficient interior to sourcing <br />" +
      "materials and executing the build, I took on various <br />" +
      "responsibilities to complete the Tiny House. <br />" +
      "Click <span class='timeline-link tinyhouse-icon'>here</span> for pictures. <br />",
    text_de:
      "Als begeisterter Heimwerker und DIY-Enthusiast habe ich <br />" +
      "mich an das ambitionierte Projekt gewagt, ein Tiny House <br />" +
      "von Grund auf zu entwerfen und zu bauen. Diese praktische <br />" +
      "Erfahrung ermöglichte es mir, meine Fähigkeiten in den <br />" +
      "Bereichen Schreinerei, Bauwesen und Projektmanagement zu <br />" +
      "entwickeln. Von der Planung des Layouts und der Gestaltung <br />" +
      "der platzsparenden Möbel bis hin zur Beschaffung von <br />" +
      "Materialien und der Ausführung des Baus habe ich mich <br />" +
      "verschiedenen Herausforderungen gestellt, um mein Tiny House <br />" +
      "Project fertigzustellen. <br />" +
      "<span class='timeline-link tinyhouse-icon'>Hier</span> geht es zu den Bildern.",
  },
  {
    year: "2013",
    text_en:
      "I completed an intensive Web Developer Training through <br />" +
      "Harvard's renowned CS50 Course, gaining comprehensive <br />" +
      "knowledge in computer science and web development. This <br />" +
      "rigorous program equipped me with a strong foundation in <br />" +
      "programming languages, algorithms, data structures, and <br />" +
      "modern web technologies. During the training, I actively <br />" +
      "engaged in various hands-on projects, honing my practical <br />" +
      "skills in front-end and back-end development. Working on <br />" +
      "real-world projects allowed me to apply my learning to <br />" +
      "create dynamic and user-friendly websites, enhancing my <br />" +
      "proficiency in HTML, CSS, JavaScript, and other relevant <br />" +
      "frameworks.",
    text_de:
      "Mit Harvard's renommiertem Web Development Kurs habe ich <br />" +
      "umfassende Kenntnisse im Bereich Informatik und <br />" +
      "Webentwicklung erworben. Dank diesem anspruchsvollen <br />" +
      "Programm und meiner bisherigen Projecte erlangte ich <br />" +
      "umfassende Kenntnisse mit Programmiersprachen, <br />" +
      "Algorithmen, Datenstrukturen und modernen Webtechnologien. <br />" +
      "Während der Ausbildung habe ich aktiv an verschiedenen <br />" +
      "praxisnahen Projekten gearbeitet und meine praktischen <br />" +
      "Fähigkeiten in der Frontend- und Backend-Entwicklung <br />" +
      "verfeinert. Durch die Arbeit an realen Projekten konnte <br />" +
      "ich mein Wissen anwenden, um dynamische und <br />" +
      "benutzerfreundliche Websites zu erstellen. Dadurch habe <br />" +
      "ich meine Fähigkeiten in HTML, CSS, JavaScript und anderen <br />" +
      "relevanten Frameworks weiter ausgebaut.",
  },
];
