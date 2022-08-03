const { createAirlineBack } = require('../controllers/AirlineController');
const { Router } = require('express');

const airlineRouter = Router();

airlineRouter.post('/',createAirlineBack)

module.exports=airlineRouter;