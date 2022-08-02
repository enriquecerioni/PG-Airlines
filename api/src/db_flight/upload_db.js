const migrar = async () => {
  const {createAdmin}=require('../controllers/AdminControllers')
    const firebase = require("firebase");
  const admin = require("firebase-admin");
   const data = require("./db.json");
  const serviceAccount = require("./key_service_account.json");
  const collectionKey = "db"; //Name of the collection


  const firebaseConfig = {
    apiKey: "AIzaSyBGr8PQQDvTRK484636fOa1XJVhIJ0lmqA",
    authDomain: "prueba-dcc65.firebaseapp.com",
    projectId: "prueba-dcc65",
    storageBucket: "prueba-dcc65.appspot.com",
    messagingSenderId: "743031201286", 
    appId: "1:743031201286:web:5df37e5654d096731f2d87",
  };

 

 // firebaseConfig.initializeApp
 firebase.initializeApp(firebaseConfig);
 admin.initializeApp({
 credential: admin.credential.cert(serviceAccount), 
 })
   const dbFirestore = firebase.firestore();
  dbFirestore.settings({ timestampsInSnapshots: true ,merge:true});




  const initializeApp = require("firebase/app");

  //------------------Validate Flights
  // let vuelos = await dbFirestore.collection("db").get();
  // if (vuelos.docs.length) {
  //   return console.log("Los vuelos ya se cargaron.");
  // }
 //------------------
  
  //   admin.initializeApp({
  //    credential: admin.credential.cert(serviceAccount),
  //  });
  
  // const firestore = admin.firestore();
  //    const settings = { timestampsInSnapshots: true };
  //  firestore.settings(settings);
  // if (data && typeof data === "object") {
  //   Object.keys(data).forEach((docKey) => {
  //     firestore
  //       .collection(collectionKey)
  //       .doc(docKey) 
  //       .set(data[docKey])
  //       .then((res) => {
  //         console.log("Document " + docKey + " successfully written!");
  //       })
  //       .catch((error) => {
  //         console.error("Error writing document: ", error);
  //       });
  //   });
  // }
                      //Generador de empresas
//-------------------------------------------------------------------------
for (const airline in data) {
  //console.log(data[`${airline}`]);
  await createAdmin(data[`${airline}`].airline,data[`${airline}`].origin,data[`${airline}`].destination,data[`${airline}`].durationEstimated,data[`${airline}`].price,data[`${airline}`].stock,data[`${airline}`].departureDate,data[`${airline}`].arrivalDate,data[`${airline}`].logo)
}
  
//--------------------------------------------------------------------
// });
   
};
module.exports = {
  migrar,
};
