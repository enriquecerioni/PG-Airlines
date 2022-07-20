const { Router } = require('express');
const flightRouter = require('./flightRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/flights', flightRouter);


module.exports = router;
