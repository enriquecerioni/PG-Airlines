import firebase from "firebase";
import { store } from "../../redux/store/index";
import {
  createUser,
  makeAdminPostgres,
  deleteUser,
  deleteUserAuth,
  currentUser,
  logOutUser,
} from "../../redux/actions/index";



const firebaseConfig = {
  apiKey: "AIzaSyBGr8PQQDvTRK484636fOa1XJVhIJ0lmqA",
  authDomain: "prueba-dcc65.firebaseapp.com",
  projectId: "prueba-dcc65",
  storageBucket: "prueba-dcc65.appspot.com",
  messagingSenderId: "743031201286",
  appId: "1:743031201286:web:5df37e5654d096731f2d87",
};

!firebase.apps.length ?  firebase.initializeApp(firebaseConfig) :firebase.app()


const dbFirebase = firebase.firestore();
const auth = firebase.auth();

//---------------------estado del usuraio------------------
auth.onAuthStateChanged(async (user) => {
  //console.log(user)

  if (user) {
    await store.dispatch(currentUser(user.email))
    let a = await dbFirebase.collection("users").doc(`${user.email}`).get();
    let userAdmin = a.data() ? a.data().admin : null;
    if (userAdmin) {
      // document.getElementById("btnHomeGuest").style.display = "none";
      document.getElementById("catalog").style.display = "";
      document.getElementById("logOut").style.display = "";
      document.getElementById("myProfile").style.display = "";
      document.getElementById("addAirline").style.display = "";
      document.getElementById("logIn").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("favs").style.display = "none";
      document.getElementById("offers").style.display = "none";
      document.getElementById("carrito").style.display = "none";
      document.getElementById("nCarrito").style.display = "none";


    

      
      // document.getElementById("MyAirline").style.display = "";
      // document.getElementById("OwnFlights").style.display = "";
    } else {
      console.log("user logged-in: ", user.displayName, user.email, user);
      // document.getElementById("btnHomeGuest").style.display = "none";
      document.getElementById("offers").style.display = "";
      document.getElementById("catalog").style.display = "none";
      document.getElementById("logIn").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("logOut").style.display = "";
      document.getElementById("myProfile").style.display = "";
      document.getElementById("addAirline").style.display = "none";
      document.getElementById("favs").style.display = "";
      document.getElementById("carrito").style.display = "";
      document.getElementById("nCarrito").style.display = "";


      // document.getElementById("mailBTN")  ? document.getElementById("mailBTN").style.display = "" : null
      // document.getElementById("addToCart")   ? document.getElementById("addToCart").style.display = "" : null
      // document.getElementById("MyAirline").style.display = "none";
      // document.getElementById("OwnFlights").style.display = "none";
    }
  } else {
    // document.getElementById("btnHomeGuest").style.display = "";
    console.log("user logged out");
    document.getElementById("offers").style.display = "";
    document.getElementById("catalog").style.display = "none";
    document.getElementById("logOut").style.display = "none";
    document.getElementById("logIn").style.display = "";
    document.getElementById("register").style.display = "";
    document.getElementById("myProfile").style.display = "none";
    document.getElementById("addAirline").style.display = "none";
    document.getElementById("favs").style.display = "";
    document.getElementById("carrito").style.display = "";
    document.getElementById("nCarrito").style.display = "";


    
    // document.getElementById("mailBTN")  ? document.getElementById("mailBTN").style.display = "" : null
    // document.getElementById("addToCart")   ? document.getElementById("addToCart").style.display = "" : null
  
    // document.getElementById("MyAirline").style.display = "none";
    // document.getElementById("OwnFlights").style.display = "none";
  }
});

//--------------------------------------------------------

export async function singUp(email, password, name) {
  try {
    let cred = await auth.createUserWithEmailAndPassword(email, password);
    //console.log(cred);
    let uid=cred.user.uid
    dbFirebase.collection("users").doc(cred.user.email).set({
      email: cred.user.email,
      admin: false,
      photo: cred.user.photoURL,
      uid: uid,
    });
    console.log(email,name,uid);
    await store.dispatch(createUser({ email, name ,uid}));
  } catch (error) {
    return `${error.message}`;
  }
}

export async function logOut() {
  await auth.signOut();
  // EstadoUsuario = false;
  // store.dispatch(logOutUser())
}

export async function logIn(email, password) {
  try {
    // if(EstadoUsuario) console.log('Usuario ya ingresado')

    let user = await auth.signInWithEmailAndPassword(email, password);

    console.log("usuario ingresado");
    return user;
  } catch (error) {
    // alert(error.message)
    return `${error.message}`;
  }
}

export async function ejecutar() {
  try {
    let google_provider = new firebase.auth.GoogleAuthProvider();
    let data = await firebase.auth().signInWithPopup(google_provider);
    let email = data.user.email;
    let name = data.user.displayName;
    let photo = data.user.photoURL;
    let uid = data.user.uid;
    let hay = await dbFirebase.collection("users").doc(email).get();
    if (!hay.data()) {
      await store.dispatch(createUser({ email, name ,uid}));
      return dbFirebase.collection("users").doc(email).set({
        email: email,
        admin: false,
        photo: photo,
        uid: uid,
      });
    }
  } catch (error){ 
  console.log(error)
  }
}
export async function makeAdmin(email) {
  try{await dbFirebase.collection("users").doc(email).update({
    admin: true,
  });
  await store.dispatch(makeAdminPostgres({ email }));
}catch(err){
  console.log(err);
}
}

export async function Delete(email,uid){
  try{ 
    await dbFirebase.collection("users").doc(email).delete()
   await store.dispatch(deleteUser(email))
    await store.dispatch(deleteUserAuth(uid))
}catch(error){
  console.log(error);
}




}