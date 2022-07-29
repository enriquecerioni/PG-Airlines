import firebase from "firebase";
import { store } from "../../redux/store/index";
import { createUser, logOutUser } from "../../redux/actions/index";

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
} else {
  firebase.app(); // if already initialized, use that one
}
const dbFirebase = firebase.firestore();

//---------------------estado del usuraio------------------


const auth = firebase.auth();

auth.onAuthStateChanged(async (user) => {
  //console.log(user)

  if (user) {
    let a = await dbFirebase.collection("users").doc(`${user.email}`).get();
    let userAdmin = a.data() ? a.data().admin : null;
    if (userAdmin) {
      document.getElementById("btnHomeGuest").style.display = "none";
      document.getElementById("catalog").style.display = "";
      document.getElementById("logOut").style.display = "";
      document.getElementById("myProfile").style.display = "";
      document.getElementById("addAirline").style.display = "";
      document.getElementById("logIn").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("favs").style.display = "none";
      document.getElementById("offers").style.display = "none";
    } else {
      console.log("usser log in: ", user.displayName, user.email);
      // document.getElementById("btnHomeGuest").style.display = "none";
      document.getElementById("offers").style.display = "";
      document.getElementById("catalog").style.display = "none";
      document.getElementById("logIn").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementById("logOut").style.display = "";
      document.getElementById("myProfile").style.display = "none";
      document.getElementById("addAirline").style.display = "none";
      document.getElementById("favs").style.display = "";
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
  }
});

//--------------------------------------------------------

export async function singUp(email,photo,name){
  try {
    let cred=await auth.createUserWithEmailAndPassword(email,photo)  
      console.log(cred)
       dbFirebase.collection("users").doc(cred.user.email).set({
        email: cred.user.email,
        admin: false ,
        photo: cred.user.photoURL
      })
      await store.dispatch(createUser(email, name,photo))
      return cred;
  } catch (error) {
    return `${error.message}`
  }
 
  
    
}

export async function logOut() {
  await auth.signOut();
  // EstadoUsuario = false;
  // store.dispatch(logOutUser())
}

export async function logIn(email,password){
try {
  // if(EstadoUsuario) console.log('Usuario ya ingresado')
        
        let user=await auth.signInWithEmailAndPassword(email,password)
       
            console.log("usuario ingresado");
            return user
        
} catch (error) {
  // alert(error.message)
            return `${error.message}`
}
        
          
          
}

export async function getUser() {
  let user = auth.currentUser;
  console.log(user);

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    await store.dispatch(
      createUser(displayName, email, photoURL, emailVerified, uid)
    );
  }
  // auth.listUsers(maxResults)
  // .then((userRecords) => {
  //   userRecords.users.forEach((user) => console.log(user.toJSON()));
  //   res.end('Retrieved users list successfully.');
  // })
  // .catch((error) => console.log(error));
}

export async function ejecutar() {
  try {
    let google_provider = new firebase.auth.GoogleAuthProvider();
    let data = await firebase.auth().signInWithPopup(google_provider);
    let email = data.user.email;
    let name = data.user.displayName;
    let photo = data.user.photoURL;
    let hay = await dbFirebase.collection("users").doc(email).get();
    if (!hay.data()) {
      await store.dispatch(createUser({ email, name, photo }));
      return dbFirebase.collection("users").doc(email).set({
        email: email,
        admin: false,
        photo: photo,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}
