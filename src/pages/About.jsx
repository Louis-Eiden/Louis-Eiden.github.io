import React, { useRef, useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom"; // NEW: To read query parameters

import ModalSlideShow from "../components/ModalSlideShow";
import { LanguageContext } from "../utils/LanguageContext.jsx";
import { useViewport } from "../utils/ViewportContext";

import "../App.css";
import "./About.css";

import { timelineData } from "../data/TimelineData.js";

export default function About() {
  const { language } = useContext(LanguageContext);

  const [textOverlay, setTextOverlay] = useState("close");
  const linkArrow = String.fromCodePoint(0x1f86d);

  // -------------------- Modal Slideshow -------------------- //

  const modalRef = useRef(); // Create a ref for the modal
  const [searchParams, setSearchParams] = useSearchParams(); // NEW: Handles query parameters

  // Access the openModal function using the ref
  const handleOpenModal = () => {
    modalRef.current.openModal(); // Open the modal
    setSearchParams({ modal: "openModal" }); // Update the query parameter
  };

  // Close the modal and remove the query parameter
  const handleCloseModal = () => {
    modalRef.current.closeModal();
    setSearchParams({}); // Clear the query parameter
  };

  // Automatically open the modal if the query parameter `modal=openModal` exists
  useEffect(() => {
    if (searchParams.get("modal") === "openModal") {
      modalRef.current.openModal();
    }
  }, [searchParams]);

  // -------------------- Viewport Breakpoints -------------------- //
  const { width } = useViewport();
  const tablet_breakpoint = 768;
  const mobile_breakpoint = 518;
  let isTablet = width <= tablet_breakpoint;
  let isMobile = width <= mobile_breakpoint;

  // -------------------- Image Arrays -------------------- //
  const TinyHouseImages = require.context(
    "../assets/tinyhouse",
    false,
    /\.(jpg|jpeg|png)$/
  );
  const TinyHouse = TinyHouseImages.keys().map((key) => {
    const relativePath = key.replace(".", "./assets/tinyhouse");
    return relativePath;
  });

  // -------------------- Timeline -------------------- //
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);

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

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
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
      <ModalSlideShow imagesProp={TinyHouse} ref={modalRef} />
      <div className="container about_container">
        <div className="timeline_container" ref={timelineRef}>
          <div className="timeline">
            <div className="line">
              {/* Year */}
              {timelineData.map((data, index) => (
                <div
                  key={index}
                  className={`timestamp ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div className="dot"></div>
                  {isTablet ? "" : <div className="year">{data.year}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="timeline_details">
            {/* Text */}
            {timelineData.map((data, index) => (
              <>
                <div
                  key={index}
                  className={`details ${index === activeIndex ? "active" : ""}`}
                >
                  {isTablet ? <div className="year">{data.year}</div> : ""}
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        language === "english" ? data.title_en : data.title_de,
                    }}
                  />
                  {isMobile ? (
                    <div
                      onClick={() => setTextOverlay("open")}
                      className="button"
                    >
                      show more ...
                    </div>
                  ) : (
                    <>
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{
                          __html:
                            language === "english"
                              ? data.text_en
                              : data.text_de,
                        }}
                      />

                      {data.year === "2022-2023" && (
                        <>
                          <a
                            href="?modal=openModal" // NEW: Use query parameter for the modal
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default anchor behavior
                              handleOpenModal(); // Open the modal manually
                            }}
                            className="timeline-link"
                          >
                            Gallery{linkArrow}
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* Text Overlay for Mobile */}
                <div
                  className={`text_overlay ${
                    index === activeIndex
                      ? textOverlay === "open"
                        ? "open"
                        : "close"
                      : ""
                  }`}
                >
                  <div
                    onClick={() => setTextOverlay("close")}
                    className="close-text-overlay"
                  >
                    close x
                  </div>
                  <div className="year">{data.year}</div>
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        language === "english" ? data.title_en : data.title_de,
                    }}
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html:
                        language === "english" ? data.text_en : data.text_de,
                    }}
                  />
                  {data.year === "2022-2023" && (
                    <span
                      href="?modal=openModal" // NEW: Use query parameter for the modal
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal();
                      }}
                      className="timeline-link"
                    >
                      Gallery
                    </span>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
