const { getAllFlight,getOriginFlight,updateToflights,createFlights,deleteFlights } = require('../controllers/FlightController');
const { Router } = require('express');

const flightRouter = Router();

flightRouter.get('/',getAllFlight)
flightRouter.get('/origen',getOriginFlight)
flightRouter.post('/create',createFlights)
flightRouter.put('/update',updateToflights)
flightRouter.delete('/delete',deleteFlights)

module.exports=flightRouter;