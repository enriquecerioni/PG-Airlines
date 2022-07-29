const { createUser,updateToAdmin, getAllUsers,deleteUserBack,deleteUserAuth} = require('../controllers/UserController');
const { Router } = require('express');

const userRouter = Router(); 

userRouter.get('/',getAllUsers)
userRouter.post('/create',createUser)
userRouter.put('/update',updateToAdmin)
userRouter.delete('/delete/:email',deleteUserBack)
userRouter.delete('/auth/:uid',deleteUserAuth)

module.exports=userRouter;   