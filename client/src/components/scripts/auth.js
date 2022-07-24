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

//---------------------estado del usuraio------------------

  const auth = firebase.auth();
  auth.onAuthStateChanged(user=>{
    if(user){
      console.log("usser log in: ",user.displayName,user.email)
      document.getElementById('logIn').style.display="none"
      document.getElementById('register').style.display="none"
      document.getElementById('logOut').style.display=""
    }
    else {
      console.log('user logged out')
      document.getElementById('logOut').style.display="none"
      document.getElementById('logIn').style.display=""
      document.getElementById('register').style.display=""
    }
  })

//--------------------------------------------------------

export function singUp(email,password){

    auth.createUserWithEmailAndPassword(email,password).then((cred)=>{
        console.log(cred)
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
      var email=data.user.email
      var name=data.user.displayName 
      var photo=data.user.photoURL
      await store.dispatch(createUser({email,name,photo}))
 }catch(error)  {
       console.log(error.message)
      };

}







