const nodemailer = require("nodemailer");
require('dotenv').config()

async function sendNodemailer({id, amount, receipt_email}) {
    try {
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      })
  
      const email = await transport.sendMail({
        from: process.env.MAIL_ORIGIN,
        to: receipt_email,
        subject: 'Payment Confirmation',
        html: `<div className='email' style="
        border_ 1px solid black;
        padding: 20px;
        font-size: 20px;"
        >
         <h2>Stripe payment accepted</h2>
         <p>${id}</p>
         <p>${amount/100}</p>
        </div>`
      })
  
      return email 
  
    } catch (error) {
      console.log('aca no llegan')
    } 
}

async function sendNodemailerPassword(link, receipt_email) {
  console.log(link, receipt_email)
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    console.log(receipt_email, " ", link)


    const email = await transport.sendMail({
      from: process.env.MAIL_ORIGIN,
      to: receipt_email,
      subject: 'Reset Password',
      html: `<div className='email' style="
      border_ 1px solid black;
      padding: 20px;
      font-size: 20px;"
      >
       <h2>Password Reset Link</h2>
       <a href=${link}>Reset Password</a>       
      </div>`
    })

   

    return email 

  } catch (error) {
    console.log('aca no llegan, ' + error)
  } 
}

module.exports = {
    sendNodemailer, 
    sendNodemailerPassword
}