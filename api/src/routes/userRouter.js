const { createUser } = require('../controllers/UserController');
const { Router } = require('express');

const userRouter = Router();


userRouter.post('/create',createUser)
// userRouter.get('/origen',getOriginFlight)

module.exports=userRouter;