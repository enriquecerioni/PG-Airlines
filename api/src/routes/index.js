const { Router } = require('express');
const { getAllFlight } = require('../controllers/FlightController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/flights', getAllFlight);


module.exports = router;
