const { getAllFlight,getOriginFlight } = require('../controllers/FlightController');
const { Router } = require('express');

const flightRouter = Router();


flightRouter.get('/',getAllFlight)
flightRouter.get('/origen',getOriginFlight)

module.exports=flightRouter;