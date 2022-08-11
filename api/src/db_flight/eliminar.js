const admin=require("firebase-admin")
const firebase=require("firebase");
const { sendNodemailerPassword } = require("../controllers/MailController");



 async function deleteAuthUser(uid){
    try {

       const serviceAccount= require("./key_service_account.json")
       if(!firebase.apps.length){
       admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
        }); 
        await admin.auth().deleteUser(uid)  
    }else{
        admin.app()
        await admin.auth().deleteUser(uid)  
    }
    } catch (error) {
        console.log(error);
    }  
}  

async function resetPasswordFirebase(email){
    try {

       const serviceAccount= require("./key_service_account.json")
       if(!firebase.apps.length){
       admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
        }); 
        let link = await admin.auth().generatePasswordResetLink(email)        
        console.log("1" + " " + link, " ", email)
        await sendNodemailerPassword(link, email)

    }else{
        admin.app()
        let link = await admin.auth().generatePasswordResetLink(email)        
        console.log("2" + " " + link, " ", email)
        await sendNodemailerPassword(link, email)

    }
    } catch (error) {
        console.log(error);
    }  
}  

async function disableAuthUser(uid){
    try {

       const serviceAccount= require("./key_service_account.json")
       if(!firebase.apps.length){
       admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
        }); 
        await admin.auth().updateUser(uid, { disabled: true })  
    }else{
        admin.app()
        await admin.auth().updateUser(uid, { disabled: true })  
    }
    } catch (error) {
        console.log(error);
    }  
}  




// async function verificateEmail(req,res){
//     try {
//         const{email}=req.body
//         admin.auth().generateEmailVerificationLink(email)
//     } catch (error) {
//         res.status(404).json({error: error.message})
//     }
// }


module.exports = { 
    deleteAuthUser,
    resetPasswordFirebase,
    disableAuthUser
    // verificateEmail
  };   