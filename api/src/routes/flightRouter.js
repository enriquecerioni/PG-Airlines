const { getAllFlight } = require('../controllers/FlightController');
const { Router } = require('express');

const flightRouter = Router();


flightRouter.get('/',getAllFlight)

module.exports=flightRouter;