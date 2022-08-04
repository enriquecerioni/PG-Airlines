import React, { createContext, useState } from 'react'

const darkModeContext = createContext()

function DarkModeProvider(props) {

    const [ darkMode, setDarkMode ] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

  return (
    <div>
        <darkModeContext.Provider value={{ darkMode, toggleDarkMode}}>
            {props.children}
        </darkModeContext.Provider>
    </div>
  )
}

export {DarkModeProvider, darkModeContext};