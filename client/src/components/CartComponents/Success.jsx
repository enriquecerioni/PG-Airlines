import React from 'react'
import { useHistory } from 'react-router-dom'

function Success() {
    const history = useHistory()

    setTimeout(() => {
        window.location.reload(false);
        history.replace('/orders')
    }, 2000)    

  return (
    <div style={ {marginTop: 5 + 'rem'}}>
      <h1>PAGO EXITOSO</h1>
    </div>
  )
}

export default Success