import React, { createContext, useContext, useEffect, useState } from "react";

// Provide default values in the context
const viewportContext = createContext({
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  height: typeof window !== "undefined" ? window.innerHeight : 0,
});

export const ViewportProvider = ({ children }) => {
  // Safe initialization for SSR
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
};

export const useOrientation = () => {
  const { width, height } = useContext(viewportContext);

  // Handle potential undefined values
  if (width === undefined || height === undefined) {
    return undefined;
  }

  if (width < 1280) {
    if (width < height) {
      return "portrait";
    } else if (width > height) {
      return "landscape";
    } else {
      // Explicitly handle the case where width equals height
      return "square"; // or "portrait" or "landscape" depending on your preference
    }
  } else {
    return "desktop";
  }
};
