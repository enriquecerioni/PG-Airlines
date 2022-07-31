const { getAllFlight,getOriginFlight,updateToflights,createUser } = require('../controllers/FlightController');
const { Router } = require('express');

const flightRouter = Router();


flightRouter.get('/',getAllFlight)
flightRouter.get('/origen',getOriginFlight)
flightRouter.post('/create',createUser)
flightRouter.post('/update',updateToflights)

module.exports=flightRouter;