// Import your CSS file
import React, { useEffect, useRef } from "react";
import "./ProgressBar.css";

// Constant Values
const MAX_WIDTH = 550;
const VALUE_ANIMATION_INTERVAL = 25;
const PROGRESS_ANIMATION_INTERVAL = 2.5;
const THRESHOLD = 0.5;

const ProgressBar = ({ targetPercentage, title, icon }) => {
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
              const progress = (MAX_WIDTH / 100) * targetPercentage;

              // Access the Progress Bar element
              let progressElement = progressBarRef.current;

              // Get the current width of the progress
              let progressElementWidth = +progressElement.style.width.replace(
                "px",
                ""
              );

              if (progressElementWidth < progress) {
                progressElement.style.width = progressElementWidth + 1 + "px"; // Set it plus 1 for the rect
                setTimeout(updateProgress, PROGRESS_ANIMATION_INTERVAL);
              }
            };

            // Function to increment the value
            const updateCount = () => {
              let currentNum = +counterRef.current.innerText.replace("%", "");
              if (currentNum < targetPercentage) {
                counterRef.current.innerText = currentNum + 1 + "%";
                setTimeout(updateCount, VALUE_ANIMATION_INTERVAL);
              }
            };

            updateCount();
            updateProgress();
          }
        });
      },
      { threshold: THRESHOLD }
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
