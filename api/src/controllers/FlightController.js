const firebase = require("firebase");


const getAllFlight = async (req, res) => {
  const dbFirestore = firebase.firestore();
  try {
    let obj = [];
    let vuelos = await dbFirestore.collection("db").get();
    vuelos.docs.map((doc) => {
      obj.push(doc.data());
    });
    res.send(obj);
    console.log("Llego la info");
  } catch (err) {
    console.log(err);
  }
};

async function getOriginFlight(req,res){
  try {
    const {origen}= req.query;
    const dbFirestore = firebase.firestore();
    
    if(!origen)res.send("write a origin")
    else{
    let vuelos = await dbFirestore.collection("db").get()
    let arrayDatos= vuelos.docs.filter(element => element.data().origin.toLowerCase().includes(origen.toLowerCase()));
    let vuelosFiltrados = arrayDatos.map(arr => arr._delegate._document.data.value.mapValue.fields);
      vuelosFiltrados.length ? res.send(vuelosFiltrados) : res.send("Origin not found")
    
  }} catch (error) {
    console.log(error)
  }
}


module.exports = {
  getAllFlight,
  getOriginFlight
};
