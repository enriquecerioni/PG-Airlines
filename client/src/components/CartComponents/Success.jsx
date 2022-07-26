import React from 'react'
import { useHistory } from 'react-router-dom'

function Success() {
    const history = useHistory()

    setTimeout(() => {
        window.location.reload(false);
        history.replace('/orders')
    }, 5000)    

  return (
    <div>
        <img src="https://c.tenor.com/0J_5oo80U3wAAAAC/pingu.gif" style={ {marginTop: 5 + 'rem'}} width='600px' height='700px' alt="#" />
    </div>
  )
}

export default Success