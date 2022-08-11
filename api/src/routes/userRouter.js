const { createUser,updateToAdmin, getAllUsers,deleteUserBack,deleteUserAuth,getAllUsersFirebaseBack, resetPassword,verificateEmail,disableUserAuth} = require('../controllers/UserController');
// const {verificateEmail} =require('../db_flight/eliminar')
const { Router } = require('express');

const userRouter = Router(); 

userRouter.get('/',getAllUsers)
userRouter.get('/firebase',getAllUsersFirebaseBack)
userRouter.post('/create',createUser)
userRouter.put('/update',updateToAdmin)
userRouter.delete('/delete/:email',deleteUserBack)
userRouter.delete('/auth/:uid',deleteUserAuth)
userRouter.post("/resetPassword/:email", resetPassword)
userRouter.put("/verificateEmail", verificateEmail)
userRouter.put("/disableUser",disableUserAuth)
// userRouter.get('/verificate',verificateEmail)

module.exports=userRouter;   