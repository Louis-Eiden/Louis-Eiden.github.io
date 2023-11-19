import React, { useEffect } from "react";

const ScrollReveal = ({ elements }) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observers = elements
      //   .filter(({ element }) => element.current) // Filter out null or undefined elements
      .map(({ element, positionClass }) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("unreveal", positionClass);
              entry.target.classList.add("reveal", positionClass);
            } else {
              entry.target.classList.remove("reveal", positionClass);
              entry.target.classList.add("unreveal", positionClass);
            }
          });
        }, options);

        observer.observe(element);
        return observer;
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [elements]);

  return (
    <div>
      {elements.map(({ element, positionClass }, index) => (
        <div key={index} ref={element} className={positionClass}></div>
      ))}
    </div>
  );
};

export default ScrollReveal;
