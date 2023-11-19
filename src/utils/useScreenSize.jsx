// frontend/src/hooks/useScreenSize.jsx

import { useEffect, useState } from "react";

// ---------- useScreenSize Hook ---------- //
export function useScreenSize() {
  const [isMobile, setIsMobile] = useState(false);

  // ---------- Set is mobile depending on the screen size ---------- //
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than 1025px
      setIsMobile(window.innerWidth < 1025);
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Initial check for screen width on component mount
    handleResize();
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the isMobile state
  return { isMobile };
}
