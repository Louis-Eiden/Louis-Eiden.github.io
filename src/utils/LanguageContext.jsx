// LanguageContext.js
import React, { createContext, useState } from "react";

// Creating a context to manage language state
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // State to hold the current language
  const [language, setLanguage] = useState("english");

  return (
    // Providing language state and setLanguage function to all components
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
