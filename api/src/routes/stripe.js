const { Router } = require('express');
const StripeFunction = require('stripe')
require('dotenv').config()

const stripeRouter = Router();

const stripe = new StripeFunction(process.env.STRIPE_KEY)

stripeRouter.post('/', async (req, res) => {
  try {
    const { id, amount, email, phone } = req.body

    const payment = await stripe.paymentIntents.create({
      amount, 
      currency: 'USD', 
      payment_method: id, 
      confirm: true,
      email,
      phone
    })
  
    console.log(payment)
    res.send({message: 'succesfull payment'})
  } catch (error) {
    res.json({message: error.raw.message})
  }
});

module.exports = stripeRouter;
