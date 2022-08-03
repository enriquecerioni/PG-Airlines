const { getAllAirlines } = require('../controllers/AirlineController');
const { Router } = require('express');

const airlineRouter = Router();

airlineRouter.get('/', getAllAirlines)
// airlineRouter.get('/origen',getOriginFlight)
// airlineRouter.post('/create',createFlights)
// airlineRouter.put('/update',updateToflights)
// airlineRouter.delete('/delete',deleteFlights)

module.exports=airlineRouter;