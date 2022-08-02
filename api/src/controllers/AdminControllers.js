const {User} = require("../db");
const {Airline} = require("../db");
const {Flight} = require("../db");

async function createAdmin(businessName,origin,destination,duration_estimated,price,tickets,departure_date,arrival_date,logo) {
    try {
        let user = await User.findOrCreate({
            where:{
                name:businessName,
                email:`${businessName.replace(' ', '')}@hotmail.com`,
                permissions:true
            }
        });
        //console.log(user[0].dataValues.id);
        let airline= await Airline.findOrCreate({
            where:{
                userId:user[0].dataValues.id,
                name:businessName,
                email:`${businessName.replace(' ', '')}@hotmail.com`,
                image:logo,
            }
        })
        let flight= await Flight.findOrCreate({
            where:{
                airlineId:airline[0].dataValues.id,
                origin:origin,
                destination:destination,
                duration_estimated:duration_estimated,
                price:price,
                tickets:tickets,
                departure_date:departure_date,
                arrival_date:arrival_date,
                logo:logo
            }
        })
       
        // await airline.addUser(user)
        // await flight.addAirline(airline)
        console.log("salio todo de 10");
        
    } catch (error) {
      console.log(error);
    }
  }
  module.exports = {
    createAdmin
  };