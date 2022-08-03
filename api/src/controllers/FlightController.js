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

async function getOriginFlight(req, res) {
  try {
    const { origen } = req.query;
    const dbFirestore = firebase.firestore();

    if (!origen) res.json({ message: "write a origin" })
    else {
      let vuelos = await dbFirestore.collection("db").get()
      let arrayDatos = vuelos.docs.filter(element => element.data().origin.toLowerCase().includes(origen.toLowerCase()));
      let vuelosFiltrados = arrayDatos.map(arr => arr._delegate._document.data.value.mapValue.fields);
      vuelosFiltrados.length ? res.status(200).json(vuelosFiltrados) : res.status(404).json({ error: "Origin not found" })

    }
  } catch (error) {
    next(error.message)
  }
}

async function updateToflights(req, res) {
  try {
    const { flight } = req.body;
    console.log(flight)
    if (!flight.id == ' ') {
      const dbFirestore = firebase.firestore();

      let flightEdit = await dbFirestore.collection("db").doc(flight.id).update(
        {
          airline: flight.airline,
          arrivalDate: flight.arrivalDate,
          arrivalHour: flight.arrivalHour,
          departureDate: flight.departureDate,
          departureHour: flight.departureHour,
          description: flight.description,
          destination: flight.destination,
          durationEstimated: flight.durationEstimated,
          flight: flight.id,
          logo: flight.logo,
          origin: flight.origin,
          price: flight.price,
          stock: flight.stock
        });
        res.send("Flight edited.")
      // if (flightEdit[0] === 0) {
      //   res.status(404).send("Flight not Found");
      // } else {
      //   res.send("Flight edited.")
      // }
    }
  } catch (error) {
    console.log(error);
  }
}


async function createFlights(req, res) {
  const { flight } = req.body;
  console.log(flight);
  try {
    if (true) {
      const dbFirestore = firebase.firestore();
      let flightdb = await dbFirestore.collection("db").doc(flight.flight);
      if (false) {
      }
      else {
        let flightCreate = await flightdb.set(flight);
        return res.status(201).json(flightCreate);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function deleteFlights(req, res) {
  const { flightIds } = req.body;
 
   console.log(flightIds);
   console.log(req.params);
   console.log(req.body);
  try {
    if (flightIds.length > 0) {
      const dbFirestore = firebase.firestore();
       let flightdb
      await flightIds.forEach(async (f) => {
        console.log(f);
        flightdb = await dbFirestore.collection("db").doc(f).delete();
      });
      if (false) {
      }
      else {
        return res.status(201).json(flightdb);
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
  createFlights,
  deleteFlights
};
