const { getAllAirlines,createAirlineBack,deleteAirlineBack } = require('../controllers/AirlineController');
const { Router } = require('express');

const airlineRouter = Router();


airlineRouter.post('/',createAirlineBack)
airlineRouter.get('/', getAllAirlines)
airlineRouter.delete('/delete/:email',deleteAirlineBack)
// airlineRouter.get('/origen',getOriginFlight)
// airlineRouter.post('/create',createFlights)
// airlineRouter.put('/update',updateToflights)



module.exports=airlineRouter;