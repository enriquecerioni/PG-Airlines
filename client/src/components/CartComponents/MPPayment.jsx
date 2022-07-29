import React, { useState } from "react";
import axios from "axios";

export default function MPPayment({ products }) {

    const [datos, setDatos] = useState('');
    console.log(datos)

    async function handleMPPayment(e) {
        e.preventDefault()

        await axios
        .post('http://localhost:3001/mpcheckout', products )
        .then((data)=>{
            setDatos(data.data.init_point)
            window.location.href = data.data.init_point 
        }).catch(error => console.error(error))
    }

  return(
      <form>
        <button onClick={handleMPPayment} type="submit">MERCADO PAGO</button>
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

