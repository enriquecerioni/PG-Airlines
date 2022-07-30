import React,{ useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../HomeComponents/Loader';

function Success() {
    const history = useHistory()
    const [isDisplayed, setIsDisplayed] = useState(false);
    
    
    useEffect(()=>{
      setInterval(() => {
        setIsDisplayed(true);
        history.replace('/orders')
      }, 2000);
    }, []) 

  return (
    <>
    {!isDisplayed ? (
      <Loader />
    ) : (
    <div style={ {marginTop: 5 + 'rem'}}>
      <h1>PAGO EXITOSO</h1>
      <iframe src="https://embed.lottiefiles.com/animation/88860"></iframe>
    </div>
    )
    }
    </>
  )
}

export default Success