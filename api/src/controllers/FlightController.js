const firebase = require("firebase");

const getAllFlight = async (req, res) => {
  const dbFirestore = firebase.firestore();
  try {
    var obj = [];
    var vuelos = await dbFirestore.collection("db").get();
    vuelos.docs.map((doc) => {
      obj.push(doc.data());
    });
    res.send(obj);
    console.log("Llego la info");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllFlight,
};
