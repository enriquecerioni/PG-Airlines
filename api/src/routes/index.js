const { Router } = require('express');
const airlineRouter = require('./airlineRouter')
const flightRouter = require('./flightRouter');
const userRouter = require('./userRouter');
const stripeRouter = require('./stripe')
const mpRouter = require('./mp')
const orderRouter = require('./orderRouter')
const commentsRouter = require('./commentsRouter')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/airlines', airlineRouter);
router.use('/flights', flightRouter);
router.use('/user',userRouter)
router.use('/stripe', stripeRouter)
router.use('/mpcheckout', mpRouter)


router.use('/orders', orderRouter)
router.use('/comments', commentsRouter)

module.exports = router;
