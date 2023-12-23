// ThemeContext.js
import React, { createContext, useState } from "react";

// Creating a context to manage theme state
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to hold the current theme
  const [theme, setTheme] = useState("bright");

  return (
    // Providing theme state and setTheme function to all components
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
