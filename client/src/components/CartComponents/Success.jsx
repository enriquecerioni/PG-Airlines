import React,{ useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import css from '../styles/Payment.module.css'
import Loader from '../HomeComponents/Loader';
import { darkModeContext } from '../DarkModeContext';

function Success() {
    const history = useHistory()
    const [isDisplayed, setIsDisplayed] = useState(false);
    const { darkMode } = useContext(darkModeContext)
    
    useEffect(()=>{
      setIsDisplayed(true)
      setInterval(() => {
        setIsDisplayed(false);
        history.replace('/orders')
      }, 4000);
    }, [history]) 

  return (
    <>
    {!isDisplayed ? (
      <Loader />
    ) : (
      <div className={ darkMode ? css.success_container_dark : css.success_container}>
      <h1 className={darkMode ? css.success_title_dark : css.success_title}>PAGO EXITOSO</h1>
      <img className={ darkMode ? css.success_img_dark : css.success_img} alt='#' src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif"/>
    </div>
    )
    }
    </>
  )
}

export default Success