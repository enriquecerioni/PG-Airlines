import firebase from 'firebase'
import {store} from '../../redux/store/index'
import {createUser} from '../../redux/actions/index'

const firebaseConfig = {
    apiKey: "AIzaSyBGr8PQQDvTRK484636fOa1XJVhIJ0lmqA",
    authDomain: "prueba-dcc65.firebaseapp.com",
    projectId: "prueba-dcc65",
    storageBucket: "prueba-dcc65.appspot.com",
    messagingSenderId: "743031201286",
    appId: "1:743031201286:web:5df37e5654d096731f2d87",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 const dbFirebase=firebase.firestore();

//---------------------estado del usuraio------------------

  const auth = firebase.auth();

  auth.onAuthStateChanged(async (user)=>{
    //console.log(user)
    if(user){
     
    //   docRef.get().then((doc) => {
    //       if (doc.exists) {
    //           console.log("Document data:", doc.data());
    //       } else {
    //           // doc.data() will be undefined in this case
    //           console.log("No such document!");
    //       }
    //   }).catch((error) => {
    //       console.log("Error getting document:", error);
    //   });





      let a=await dbFirebase.collection("users").doc(`${user.email}`).get()
      let userAdmin =a.data().admin
      if(userAdmin){
        document.getElementById('logOut').style.display=""
        document.getElementById('myProfile').style.display=""
        document.getElementById('addAirline').style.display=""
        document.getElementById('logIn').style.display="none"
        document.getElementById('register').style.display="none"
        document.getElementById('favs').style.display="none"
      }else{
      console.log("usser log in: ",user.displayName,user.email)
      document.getElementById('logIn').style.display="none"
      document.getElementById('register').style.display="none"
      document.getElementById('logOut').style.display=""
      document.getElementById('myProfile').style.display="none"
      document.getElementById('addAirline').style.display="none"
      document.getElementById('favs').style.display=""

      }
    }
    else {
      console.log('user logged out')
      document.getElementById('logOut').style.display="none"
      document.getElementById('logIn').style.display=""
      document.getElementById('register').style.display=""
      document.getElementById('myProfile').style.display="none"
      document.getElementById('addAirline').style.display="none"
      document.getElementById('favs').style.display=""

    }
  })

//--------------------------------------------------------

export function singUp(email,password){

    auth.createUserWithEmailAndPassword(email,password).then((cred)=>{  
      console.log(cred)
      return dbFirebase.collection("users").doc(cred.user.uid).set({
        email: cred.user.email,
        admin: false ,
        photo: cred.user.photoURL
      })
    })
      
}

export function logOut(){

      auth.signOut().then(()=>{})

}

export function  logIn(email,password){
    auth.onAuthStateChanged(user=>{
        if(user) console.log('Usuario ya ingresado')
        else {
        auth.signInWithEmailAndPassword(email,password)
        .then(()=>{
            console.log("usuario ingresado");
          })
          .catch((error)=>{
            alert(error.message)
          })
        }
      })
    
      
}
export async function ejecutar(){
try{

    let google_provider= new firebase.auth.GoogleAuthProvider();
     let data = await firebase.auth().signInWithPopup(google_provider)
      let email=data.user.email
      let name=data.user.displayName 
      let photo=data.user.photoURL
      let hay= await dbFirebase.collection("users").doc(email).get()
      if(!hay.data()){
      await store.dispatch(createUser({email,name,photo}))
      return dbFirebase.collection("users").doc(email).set({
        email: email,
        admin: false ,
        photo: photo
      })
    }
 }catch(error)  {
       console.log(error.message)
      };

}








