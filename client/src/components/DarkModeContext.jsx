import React, { createContext, useEffect, useState } from 'react'

const darkModeContext = createContext()

function DarkModeProvider(props) {

    const [ darkMode, setDarkMode ] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
      const json = localStorage.getItem("site-dark-mode");
      const currentMode = JSON.parse(json);
      if (currentMode) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }, [])

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      const json = JSON.stringify(darkMode);
      localStorage.setItem("site-dark-mode", json);
    }, [darkMode]);

  return (
    <div>
        <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {props.children}
        </darkModeContext.Provider>
    </div>
  )
}

export { DarkModeProvider, darkModeContext };