// Import your CSS file
import React, { useEffect, useRef } from "react";
import "./ProgressBar.css";

import { useViewport } from "../utils/ViewportContext";

const ProgressBar = ({ targetPercentage, title, icon }) => {
  const { width } = useViewport();
  const tablet_breakpoint = 1440;
  const mobile_breakpoint = 768;
  let isTablet = width <= tablet_breakpoint;
  let isMobile = width <= mobile_breakpoint;

  // Constant Values
  let max_size = isMobile ? 100 : isTablet ? 125 : 550;
  let value_animation_interval = isTablet || isMobile ? 10 : 25;
  let progress_animation_interval = isTablet || isMobile ? 10 : 2.5;
  let threshold = 0.5;

  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Start animation when the component is in view
          if (entry.isIntersecting) {
            // Function to increment the progress
            const updateProgress = () => {
              const progress = (max_size / 100) * targetPercentage;

              // Access the Progress Bar element
              let progressElement = progressBarRef.current;

              // Get the current size of the progress
              let progressElementSize = isTablet
                ? +progressElement.style.height.replace("px", "")
                : +progressElement.style.width.replace("px", "");

              if (progressElementSize < progress) {
                isTablet
                  ? (progressElement.style.height =
                      progressElementSize + 1 + "px")
                  : (progressElement.style.width =
                      progressElementSize + 1 + "px"); // Set it plus 1 for the rect
                setTimeout(updateProgress, progress_animation_interval);
              }
            };

            // Function to increment the value
            const updateCount = () => {
              let currentNum = +counterRef.current.innerText.replace("%", "");
              if (currentNum < targetPercentage) {
                counterRef.current.innerText = currentNum + 1 + "%";
                setTimeout(updateCount, value_animation_interval);
              }
            };

            updateCount();
            updateProgress();
          }
        });
      },
      { threshold: threshold }
    );

    observer.observe(progressBarRef.current);

    // Cleanup the observer when the component is unmounted
    return () => observer.disconnect();
  }, [targetPercentage]);

  return (
    <div className="skill">
      <div className="sk-progress">
        <div className="sk-title">
          <span className="sk-icon">{icon}</span>
          <span className="sk-text">{title}</span>
        </div>
        <div className="progress_bar">
          <div className="progress" ref={progressBarRef}></div>
          <div className="counter" ref={counterRef}>
            {0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
