const { createUser,updateToAdmin} = require('../controllers/UserController');
const { Router } = require('express');

const userRouter = Router();


userRouter.post('/create',createUser)
userRouter.put('/update',updateToAdmin)
// userRouter.get('/origen',getOriginFlight)

module.exports=userRouter;