import React,{ useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import css from '../styles/Payment.module.css'
import Loader from '../HomeComponents/Loader';

function Success() {
    const history = useHistory()
    const [isDisplayed, setIsDisplayed] = useState(false);
    
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
      <div className={css.success_container}>
      <h1>PAGO EXITOSO</h1>
      <img alt='#' src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif"/>
    </div>
    )
    }
    </>
  // <div className={css.success_container}>
  //   <h1>PAGO EXITOSO</h1>
  //   <img alt='#' src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif"/>
  // </div>
  )
}

export default Success