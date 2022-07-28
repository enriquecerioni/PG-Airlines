const { createUser,updateToAdmin, getAllUsers} = require('../controllers/UserController');
const { Router } = require('express');

const userRouter = Router();

userRouter.get('/',getAllUsers)
userRouter.post('/create',createUser)
userRouter.put('/update',updateToAdmin)
// userRouter.get('/origen',getOriginFlight)

module.exports=userRouter;