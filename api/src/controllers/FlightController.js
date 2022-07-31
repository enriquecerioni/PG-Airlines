const firebase = require("firebase");
const { Flights } = require("../db");

const getAllFlight = async (req, res) => {
  const dbFirestore = firebase.firestore();
  try {
    let obj = [];
    let vuelos = await dbFirestore.collection("db").get();
    vuelos.docs.map((doc) => {
      //console.log(doc);
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

async function updateToflights(req, res) {
  try {
     //const { flight, airline, logo, price, stock, origin, duration, depH, arrH, destination, depD, arrD, description } = req.body;
    const { flight} = req.body;
    console.log(flight);
  
   // console.log(req.body);
   // console.log(airline,flight);
    if (!flight.id == ' ') {
      // let Flight = await Flights.db(
      //   {
      //     permissions: true,
      //   },
      //   {
      //     where: { email: email },
      //   }
      // );
        if(false){
            res.status(404).send("Flight not Found");
        }else{
            res.send("Flight edited.")
        }
    }
  } catch (error) {
    console.log(error);
  }
}


async function createUser(req, res) {
  const { flight} = req.body;
  try {
    if (!flight.id == ' ') {
      let flight = await Flights.findAll({
        where: { flight: flight.id },
      });
      if (flight.length) {
      } 
      else {
        let flightCreate = await Flights.create({
          airline: "LATAM Airlines Group",
          arrivalDate: "2022-12-13",
          arrivalHour: "15:05",
          departureDate: "2022-12-12",
          departureHour: "19:35",
          description: "Detail",
          destination: "Punta Cana",
    durationEstimated: "20:30",
              airline: "LA2368",
                logo: "https://www.despegar.com.ar/flights-images/latest/common/airlines/25x25/LA.png",
              origin: "Buenos Aires",
               price: 300000,
               stock: 98
          
             });
        return res.status(201).json(userCreated);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  getAllFlight,
  getOriginFlight,
  updateToflights,
  createUser
};
