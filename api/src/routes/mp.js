const { Router, response } = require('express');
const mercadopago = require("mercadopago");
const { sendNodemailer } =require('../controllers/MailController')
const mpRouter = Router()
require('dotenv').config()
// MP_ACCESS_TOKEN MERCADO_PAGO_TEST

mercadopago.configure({access_token: 'APP_USR-2649784276525888-072822-b37b383d3f25dd129bf801a2cacbf9cf-1169213928'});

mpRouter.post('/', async (req, res) => {
// Agrega credenciales
    
    const products =  req.body
    console.log(products)

    const items = products.map(e => {
        return  { 
            title: e.airline,
            unit_price: parseFloat(e.price),
            quantity: e.amount
        }
    })
 
    let preference = {
        items: items,
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/payment',
            pending: 'http://localhost:3000/payment',
        },
        auto_return: 'approved'
    }

    mercadopago.preferences.create(preference)  
    .then(response => {
        console.log('queriendo')
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.set("Access-Control-Allow-Credentials", true);
        console.log("URL: ", response.body.init_point);
        // console.log(response)
        return res.json({ id: response.body.id, init_point: response.body.init_point})
    })
    .catch(error => console.log(error))

})

/*
VENDEDOR DE PRUEBA
{
    "id": 1169213928,
    "nickname": "TETE2951108",
    "password": "qatest9364",
    "site_status": "active",
    "site_id": "MLA",
    "description": "a description",
    "date_created": "2022-07-28T22:38:02-04:00",
    "date_last_updated": "2022-07-28T22:38:02-04:00"
}

Public Key
APP_USR-1e025b86-e027-4c3d-89ed-012b0c8caca7

Access Token
APP_USR-2649784276525888-072822-b37b383d3f25dd129bf801a2cacbf9cf-1169213928


USUARIO DE PRUEBA {
    "id": 1169218624,
    "nickname": "TT840939",
    "password": "qatest7469",
    "site_status": "active",
    "site_id": "MLA",
    "description": "a description",
    "date_created": "2022-07-28T22:39:05-04:00",
    "date_last_updated": "2022-07-28T22:39:05-04:00"
}

email: test_user_24731392@testuser.com

*/

// mpRouter.get("/pagos/:id", async (req, res)=>{
//     const mp = new mercadopago(PROD_ACCESS_TOKEN)
//     const {id} = req.params
//     console.info("Buscando el id", id)
//     mp.get(`https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.MP_ACCESS_TOKEN}`)
//     .then(resultado  => {
//       //console.info('resultado', resultado)
//       res.json({"resultado": resultado})
//     })
//     .catch(error => {
//       console.error('Nop', error)
//       res.json({
//         error: error
//       })
//     })  
// })

// mpRouter.get("/pagos", async  (req, res)=>{

//     const payment_id= req.query.payment_id
//     const payment_status= req.query.status // ESTADO DE LA OPERACION
//     const external_reference = req.query.external_reference // MAIL DE USUARIO
//     const merchant_order_id= req.query.merchant_order_id
//     // console.log(req.query);
    
//         if(usuario.shopping === null) {
    
//         await User.update({ shopping: usuario.cart, cart: null, emptyCart: true, sendEmail: true}, { where: { email: external_reference } });
//         const getInfo = await User.findByPk(external_reference)
  
//         } else {
    
//           await User.update(
//             { shopping: usuario.shopping.concat(usuario.cart), cart: null, emptyCart: true, sendEmail: true },
//             { where: { email: external_reference } }
//           );
//            const getInfo = await User.findByPk(external_reference)
     
//         }
  
//         return res.redirect("http://localhost:3000/home")
    
//       }
  
//       if(payment_status === "cancelled") {
  
//         console.log("Su pago fue cancelado");
//         return res.redirect("http://localhost:3000/home")
         
//   })

module.exports = mpRouter;