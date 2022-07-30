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
    // console.log(products)

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
        auto_return: 'approved',
        binary_mode: true,
        // payer: {
        //     email: 'test_user_24731392@testuser.com',
        // },
        payer_email: 'test_user_24731392@testuser.com',
        payment_method_id: "visa"
    }

    mercadopago.preferences.create(preference)  
    .then(response => {
        console.log('queriendo')
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.set("Access-Control-Allow-Credentials", true);
        // console.log("URL: ", response.body.init_point);
        console.log(response)
        return res.json({ id: response.body.id, init_point: response.body.init_point})
    })
    .catch(error => console.log(error))
})

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

module.exports = mpRouter;