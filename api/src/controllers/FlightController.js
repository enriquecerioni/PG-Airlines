const firebase = require("firebase");
const {Flight} = require('../db')
const {Airline}=require('../db')

const getAllFlight = async (req, res,next) => {
  // const dbFirestore = firebase.firestore();  
  try {
    // let obj = [];
    // let vuelos = await dbFirestore.collection("db").get();
    // vuelos.docs.map((doc) => {
    //   //console.log(doc);
    //   obj.push(doc.data());
    // });
    // res.json(obj);
    // console.log("Llego la info");
    let allFligths = await Flight.findAll({
      includes: {
        model: Airline,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    console.log(allFligths)
    
    if (allFligths.length) {
      res.status(200).json(allFligths);
    } else {
      res.status(404).send({ message: "Flights not found" });
    }
  } catch (error) {
    next(error.message);
  }
};

async function getOriginFlight(req, res,next) {
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
    //console.log(flight)
    if (!flight.id == ' ') {
      

       let fligth=await Flight.update(
        {
          arrivalDate: flight.arrivalDate,
          arrivalHour: flight.arrivalHour,
          departureDate: flight.departureDate,
          departureHour: flight.departureHour,
          description: flight.description,
          destination: flight.destination,
          durationEstimated: flight.durationEstimated,
          logo: flight.logo,
          origin: flight.origin,
          price: flight.price,
          tickets: flight.stock
        },
        {
          where:{id:flight.id},
        });
      
        res.status(200).json({message:"Flight edited."})
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
  const { id,
    arrivalDate,
    arrivalHour,
    departureDate,
    departureHour,
    destination,
    durationEstimated,
    logo,
    origin,
    price,
    stock
  } = req.body;
  //console.log(flight);
  try {
    if (id && stock && price) {
     console.log(id,  // user id
      arrivalDate,
      arrivalHour,
      departureDate,
      departureHour,
      destination,
      durationEstimated,
      logo,
      origin,
      price,
      stock);
      let airline=await Airline.findOne({where:{userId:id}})
      console.log("airline",airline);
      if(airline){
        await Flight.create({
          airlineId:airline.id,
          arrivalDate:arrivalDate,
          arrivalHour:arrivalHour,
          departureDate:departureDate,
          departureHour:departureHour,
          destination:destination,
          durationEstimated:durationEstimated,
          logo:logo,
          origin:origin,
          price:price,
          tickets:stock
        })
        return res.status(200).json({message: "Flight added"})
      }else{
        res.status(404).json({error: "Business not found"})
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function deleteFlights(req, res) {
  const { flightIds } = req.body;
 
   //console.log(flightIds);
  //  console.log(req.params);
  //  console.log(req.body);
  try {
    if (flightIds.length > 0) {
      await flightIds.forEach(async (f) => {
        //console.log(f);
        await Flight.destroy({
          where:{id:f},
          force:true
        })

      });
      
      
        return res.status(201).json({message: "Flight was deleted "});
      
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function updateStock(req,res){
  try {

    const{flightIdAmount}=req.body;
    // console.log(flightIdAmount);

    if(flightIdAmount.length){
      await Promise.all( flightIdAmount.map(async (flight)=>{

        let flightToUpdate=await Flight.findByPk(flight.id)

        if(flightToUpdate.tickets===flight.amount){

          await Flight.destroy({
            where:{id:flight.id},
            force:true
          })

        }
        else{

          await Flight.update(
          {
            tickets:flightToUpdate.tickets-flight.amount
          },
          {
            where:{id:flightToUpdate.id}
          }

        )}

    }))
  } 
    return res.status(200).json({message: "Flight updated"})
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




module.exports = {
  getAllFlight,
  getOriginFlight,
  updateToflights,
  createFlights,
  deleteFlights,
  updateStock
};
