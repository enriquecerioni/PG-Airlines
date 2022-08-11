import firebase from "firebase";
import { store } from "../../redux/store/index";
import {
  createUser,
  makeAdminPostgres,
  deleteUser,
  deleteUserAuth,
  currentUser,
  verifyEmail,
  disableUser

 
} from "../../redux/actions/index";



const firebaseConfig = {
  apiKey: "AIzaSyBGr8PQQDvTRK484636fOa1XJVhIJ0lmqA",
  authDomain: "prueba-dcc65.firebaseapp.com",
  projectId: "prueba-dcc65",
  storageBucket: "prueba-dcc65.appspot.com",
  messagingSenderId: "743031201286",
  appId: "1:743031201286:web:5df37e5654d096731f2d87",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const dbFirebase = firebase.firestore();
const auth = firebase.auth();

//---------------------estado del usuraio------------------
auth.onAuthStateChanged(async (user) => {
  //console.log(user)

  if (user) {
    //console.log(user.email);
    setTimeout(()=>{store.dispatch(currentUser(user.email))},2800)

    
  
    

    let a = await dbFirebase.collection("users").doc(`${user.email}`).get();
    let userAdmin = a.data() ? a.data().admin : null;
    if (userAdmin) {
      // document.getElementById("btnHomeGuest").style.display = "none";
      console.log("admin");
      // document.getElementById("catalog").style.display = "";
      // document.getElementById("logOut").style.display = "";
      // document.getElementById("myProfile").style.display = "";
      // document.getElementById("addAirline").style.display = "";
      // document.getElementById("logIn").style.display = "none";
      // document.getElementById("register").style.display = "none";
      // document.getElementById("favs").style.display = "none";
      // document.getElementById("offers").style.display = "none";
      // document.getElementById("carrito").style.display = "none";
      // document.getElementById("nCarrito").style.display = "none";
      return;

      // document.getElementById("MyAirline").style.display = "";
      // document.getElementById("OwnFlights").style.display = "";
    } else if (user.emailVerified) {
      let email=user.email
      await store.dispatch(verifyEmail({email}))
      //console.log("user logged-in: ", user.displayName, user.email, user);
      // document.getElementById("btnHomeGuest").style.display = "none";
      console.log("user verificado");
      // document.getElementById("offers").style.display = "";
      // document.getElementById("catalog").style.display = "none";
      // document.getElementById("logIn").style.display = "none";
      // document.getElementById("register").style.display = "none";
      // document.getElementById("logOut").style.display = "";
      // document.getElementById("myProfile").style.display = "";
      // document.getElementById("addAirline").style.display = "none";
      // document.getElementById("favs").style.display = "";
      // document.getElementById("carrito").style.display = "";
      // document.getElementById("nCarrito").style.display = "";

      // document.getElementById("mailBTN")  ? document.getElementById("mailBTN").style.display = "" : null
      // document.getElementById("addToCart")   ? document.getElementById("addToCart").style.display = "" : null
      // document.getElementById("MyAirline").style.display = "none";
      // document.getElementById("OwnFlights").style.display = "none";
    } else if (!user.emailVerified) {
      console.log("usuario no verificado");
      // document.getElementById("offers").style.display = "";
      // document.getElementById("catalog").style.display = "none";
      // document.getElementById("logOut").style.display = "";
      // document.getElementById("logIn").style.display = "none";
      // document.getElementById("register").style.display = "none";
      // document.getElementById("myProfile").style.display = "";
      // document.getElementById("addAirline").style.display = "none";
      // document.getElementById("favs").style.display = "";
      // document.getElementById("carrito").style.display = "";
      // document.getElementById("nCarrito").style.display = "";
    }
  } else {
    // document.getElementById("btnHomeGuest").style.display = "";

    console.log("guest ");
    // document.getElementById("offers").style.display = "";
    // document.getElementById("catalog").style.display = "none";
    // document.getElementById("logOut").style.display = "none";
    // document.getElementById("logIn").style.display = "";
    // document.getElementById("register").style.display = "";
    // document.getElementById("myProfile").style.display = "none";
    // document.getElementById("addAirline").style.display = "none";
    // document.getElementById("favs").style.display = "";
    // document.getElementById("carrito").style.display = "";
    // document.getElementById("nCarrito").style.display = "";

    // document.getElementById("mailBTN")  ? document.getElementById("mailBTN").style.display = "" : null
    // document.getElementById("addToCart")   ? document.getElementById("addToCart").style.display = "" : null

    // document.getElementById("MyAirline").style.display = "none";
    // document.getElementById("OwnFlights").style.display = "none";
  }
});

//--------------------------------------------------------

export async function singUp(email, password, phone, image, name) {
  try {
    let cred = await auth.createUserWithEmailAndPassword(email, password);
    let uid = cred.user.uid;
    let img = cred.user.photoURL ? cred.user.photoURL : image;
    
    //console.log("1", email, name, uid);
    await cred.user.sendEmailVerification();
    //console.log("2", email, name, uid);

    // console.log(email, name, uid, img);
    await store.dispatch(createUser({ email, name, uid, img, phone}));
    return  dbFirebase.collection("users").doc(email).set({
      name: name,
      email: email,
      admin: false,
      phone: phone,
      photo: img ? img : "",
      uid: uid,
      superAdmin: false,
      emailVerificated:false,
      disable:false,
    });
  } catch (error) {
    return `${error.message}`;
  }
}

export async function singUpAirline(email, password, name, image, phone) {
  try {
    let cred = await auth.createUserWithEmailAndPassword(email, password);
    let uid = cred.user.uid;
    let img = cred.user.photoURL;
    
    //console.log("1", email, name, uid);
    await cred.user.sendEmailVerification();
    //console.log("2", email, name, uid);

    console.log(email, name, uid, img);
    await store.dispatch(createUser({ email, name, uid, img, image, phone }));
    return  dbFirebase.collection("users").doc(email).set({
      empresa: false,
      name: name,
      email: email,
      admin: false,
      phone: phone,
      photo: image ? image : null,
      uid: uid,
      superAdmin: false,
  
    });
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
    let img = data.user.photoURL;
    let uid = data.user.uid;

    let hay = await dbFirebase.collection("users").doc(email).get();
    if (!hay.data()) {
      let emailVerificated=true
      await store.dispatch(createUser({ email, name, uid, img ,emailVerificated}));
      return dbFirebase.collection("users").doc(email).set({
        email: email,
        admin: false,
        photo: img,
        uid: uid,
        empresa:false,
        superAdmin: false,
        emailVerificated:true,
        disable:false
      })
    }else{

    }
   
  } catch (error) {
    console.log(error);
  }
}
export async function makeAdmin(email) {
  try {
    await dbFirebase.collection("users").doc(email).update({
      admin: true,
      empresa:true
    });
    await store.dispatch(makeAdminPostgres({ email }));
  } catch (err) {
    console.log(err);
  }
}

export async function Delete(email, uid) {
  try {
    await dbFirebase.collection("users").doc(email).delete();
    await store.dispatch(deleteUser(email));
    await store.dispatch(deleteUserAuth(uid));
  } catch (error) {
    console.log(error);
  }
}


export async function disableUserAuth( uid,email) {
  try {
   await dbFirebase.collection("users").doc(email).update({
    disable:true
   })
    await store.dispatch(disableUser({uid}));
  } catch (error) {
    console.log(error);
  }
}