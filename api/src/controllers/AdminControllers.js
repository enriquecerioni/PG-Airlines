const { User } = require("../db");
const { Airline } = require("../db");
const { Flight } = require("../db");
const firebase = require("firebase");

async function createAdmin(
  businessName,
  origin,
  destination,
  durationEstimated,
  price,
  tickets,
  departureDate,
  arrivalDate,
  logo,
  departureHour,
  arrivalHour
) {
  try {
    let email =
      `${businessName.replace(" ", "")}`.toLowerCase() + "1" + "@hotmail.com";
    if (
      businessName.replace(" ", "") === "Lufthansa" ||
      businessName.replace(" ", "") === "AerolineasArgentinas"
    ) {
      email =
        `${businessName.replace(" ", "")}`.toLowerCase() +
        "1999" +
        "@hotmail.com";
    }

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
      firebase.app();
    }
    const auth = firebase.auth();
    const dbFirebase = firebase.firestore();
    let hayData = await dbFirebase.collection("users").doc(email).get();
    if (!hayData.data()) {
      let cred = await auth.createUserWithEmailAndPassword(email, "empresa");
      let emailU = cred.user.email;
      let uid = cred.user.uid;
      let img = cred.user.photoURL;

      await cred.user.sendEmailVerification();

      let user = await User.findOrCreate({
        where: {
          name: businessName,
          email: email,
          permissions: true,
          uid: uid,
        },
      });

      return dbFirebase
        .collection("users")
        .doc(emailU)
        .set({
          email: emailU,
          admin: true,
          photo: img ? img : "",
          uid: uid,
          superAdmin: false,
          empresa: true
        });
    }

    let user = await User.findOrCreate({
      where: { email: email },
    });
    console.log("user finde one: ", user[0].dataValues.id);
    // console.log(user[0].dataValues.id);
    let airline = await Airline.findOrCreate({
      where: {
        userId: user[0].dataValues.id,
        name: businessName,
        email: email,
        image: logo,
      },
    });

    let flight = await Flight.findOrCreate({
      where: {
        airlineId: airline[0].dataValues.id,
        origin: origin,
        destination: destination,
        durationEstimated: durationEstimated,
        price: price,
        tickets: tickets,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        logo: logo,
        departureHour: departureHour,
        arrivalHour: arrivalHour
      },
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createAdmin,
};
