const { Router } = require('express');
const StripeFunction = require('stripe')
const { sendNodemailer } =require('../controllers/MailController')

require('dotenv').config()

const stripeRouter = Router();
const stripe = new StripeFunction(process.env.STRIPE_KEY)

stripeRouter.post('/', async (req, res) => {
  try {
    const { id, amount, receipt_email } = req.body
    // console.log(id, amount, receipt_email,receipt_number)

    const payment = await stripe.paymentIntents.create({
      amount, 
      currency: 'USD', 
      payment_method: id, 
      confirm: true,
      receipt_email,
    })
    console.log(payment)

    await sendNodemailer({ id, amount, receipt_email })

    return res.send(payment)
  } catch (error) {
    res.json({message: error.raw.message})
  }
});

module.exports = stripeRouter;