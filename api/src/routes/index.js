const { Router } = require('express');
const flightRouter = require('./flightRouter');
const userRouter = require('./userRouter');
const stripeRouter = require('./stripe')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/flights', flightRouter);
router.use('/user',userRouter)
router.use('/checkout', stripeRouter)


module.exports = router;
