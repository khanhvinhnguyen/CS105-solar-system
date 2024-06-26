import React, { createContext, useState, useEffect } from "react";
import intl from "react-intl-universal";

export const SettingContext = createContext({
  language: "en",
  toggleLanguage: () => {},
  orbitLineState: false,
  toggleOrbitLine: () => {},
  planetSpeed: 1,
  handleSpeedPlanet: () => {},
});

export const SettingProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [orbitLineState, setOrbitLineState] = useState(false);
  const [planetSpeed, setPlanetSpeed] = useState(1);

  useEffect(() => {
    loadLocale(language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "vn" : "en"));
  };

  const toggleOrbitLine = () => {
    setOrbitLineState((prevOrbitLineState) => !prevOrbitLineState);
  };

  const handleSpeedPlanet = (value) => {
    setPlanetSpeed(value);
  };

  const loadLocale = async (locale) => {
    let localeData;

    if (locale === "en") {
      localeData = await import("@/locales/en_US.js");
    } else if (locale === "vn") {
      localeData = await import("@/locales/vi_VN.js");
    }

    intl.init({
      currentLocale: locale,
      locales: {
        [locale]: localeData.default,
      },
    });
  };

  return (
    <SettingContext.Provider
      value={{
        language,
        toggleLanguage,
        orbitLineState,
        toggleOrbitLine,
        planetSpeed,
        handleSpeedPlanet,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
