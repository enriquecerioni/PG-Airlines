const firebase = require("firebase");


const getAllFlight = async (req, res) => {
  const dbFirestore = firebase.firestore();
  try {
    let obj = [];
    let vuelos = await dbFirestore.collection("db").get();
    vuelos.docs.map((doc) => {
      //console.log(doc);
      obj.push(doc.data());
    });

    res.json(obj);


    // console.log("Llego la info");
  } catch (error) {
    next(error.message);
  }
};

async function getOriginFlight(req,res){
  try {
    const {origen}= req.query;
    const dbFirestore = firebase.firestore();
    
    if(!origen)res.json({message:"write a origin"})
    else{
    let vuelos = await dbFirestore.collection("db").get()
    let arrayDatos= vuelos.docs.filter(element => element.data().origin.toLowerCase().includes(origen.toLowerCase()));
    let vuelosFiltrados = arrayDatos.map(arr => arr._delegate._document.data.value.mapValue.fields);
      vuelosFiltrados.length ? res.status(200).json(vuelosFiltrados) : res.status(404).json({error:"Origin not found"})
    
  }} catch (error) {
    next(error.message)
  }
}


module.exports = {
  getAllFlight,
  getOriginFlight
};
