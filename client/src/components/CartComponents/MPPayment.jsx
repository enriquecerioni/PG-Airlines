import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button }from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../redux/actions/index'

export default function MPPayment({ products, subTotal, user, disabled, loading }) {

    const [datos, setDatos] = useState('');
    const dispatch = useDispatch()

    // Crear orden de compra
    const sendOrder = {
      price: subTotal,
      stocks : products.map(e => {
          return {
              amount: e.amount,
              airline: e.airline,
              value: e.price
          }
      }),
      userId: user ? user.id : null
  }

    async function handleMPPayment(e) {
        e.preventDefault()

        await axios
        .post('http://localhost:3001/mpcheckout', products )
        .then((data)=>{
          console.log(data)
            setDatos(data.data.init_point)
            window.location.href = data.data.init_point 
            dispatch(createOrder(sendOrder))
        }).catch(error => console.error(error))
    }

  return(
      <form>
        <Button 
        disabled={!disabled || loading}
        variant="contained" 
        size="large" 
        onClick={handleMPPayment} 
        type="submit">MERCADO PAGO</Button>
      </form>
  )

}

// //     if(res.global){
// //       const script = document.createElement("script");
// //     //   console.log(script)
// //       script.type = "text/javascript";
// //       script.src =
// //     "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
// //       script.setAttribute("data-preference-id", res.global);
// //       const form = document.getElementById(FORM_ID);
// //       form.appendChild(script);
// //       }
    
// //   }, []);

