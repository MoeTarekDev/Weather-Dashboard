import { createContext, useContext, useState } from "react";

export const featuresContext = createContext(null);

export function FeaturesProvider({ children }) {
  let [homeDefaultState, setHomeDefaultState] = useState(
    localStorage.getItem("country") || "egypt"
  );
  let [countryIsoCode, setCountryIsoCode] = useState(
    localStorage.getItem("isoCode") || "EG"
  );
  let [firstState, setFirstState] = useState(
    localStorage.getItem("firstState") || "Cairo"
  );
  let [secondsState, setSecondsState] = useState(
    localStorage.getItem("secondeState") || "Luxor"
  );
  const [isItDark, setIsItDark] = useState(() => {
    const storedTheme = localStorage.getItem("isItDark");
    return storedTheme !== null
      ? JSON.parse(storedTheme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  let [isNavBarOpened, setIsNavBarOpened] = useState(true);

  return (
    <featuresContext.Provider
      value={{
        homeDefaultState,
        setHomeDefaultState,
        countryIsoCode,
        setCountryIsoCode,
        firstState,
        setFirstState,
        secondsState,
        setSecondsState,
        isItDark,
        setIsItDark,
        isNavBarOpened,
        setIsNavBarOpened,
      }}
    >
      {children}
    </featuresContext.Provider>
  );
}

export default function useFeatures() {
  const context = useContext(featuresContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
