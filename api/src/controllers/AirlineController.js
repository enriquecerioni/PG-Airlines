
const {User}=require('../db')
const {Airline} = require('../db')


async function createAirlineBack(req,res){
    try {
        const{email}=req.body
        let user=await User.findOne({
            where:{email:email}
        })
      
        if(user ){
            let airline= await Airline.create({
                
                    userId:user.id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    image:user.imager,  
        } )
        res.status(201).json(airline)
    }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
async function getAllAirlines(req, res, next) {
  try {
    let allAirlines = await Airline.findAll();
    if (allAirlines.length) {
      res.status(200).json(allAirlines);
    } else {
      res.status(404).send({ message: "Users not found" });
    }
  } catch (error) {
    next(error.message);
  }
}

module.exports = {
    getAllAirlines,
     createAirlineBack
  };

