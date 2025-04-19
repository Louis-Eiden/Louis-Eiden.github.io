import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { projectData } from "../data/ProjectData";
import { useViewport } from "../utils/ViewportContext";

// Component accepts activeIndex and setActiveIndex as props
export function ProjectsSlider({ activeIndex, setActiveIndex, onProjectClick }) {
  const sliderContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  // observer to set active the index (of the project) that is currently in view
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

  return (
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
            onClick={() => onProjectClick && onProjectClick(index)}
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
  );
}
