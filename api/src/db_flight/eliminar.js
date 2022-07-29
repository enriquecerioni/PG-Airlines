const admin=require("firebase-admin")
const firebase=require("firebase")

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
module.exports = { 
    deleteAuthUser 
  };   