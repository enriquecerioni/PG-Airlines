
const {User}=require('../db')
const {Airline} = require('../db')
const {Flight} = require('../db')


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

async function deleteAirlineBack (req,res,next){
  try {
    const{email}=req.params
    console.log(email);
    if(email){
      let airline=await Airline.findOne({
        where:{email:email}
      })
     if(airline)  {
      await Flight.destroy({
        where:{airlineId:airline.id},
        force:true
      })
      await Airline.destroy({
        where:{email:email},
        force:true
      })
      res.status(200).json({message: "airline and flights eliminated"})
     } 
      else  res.status(404).json({error: "Business not found"})
      
    }
    else res.status(400).json({error: "please forgive an email"})
  } catch (error) {
    next(error.message)
  }
}



module.exports = {
    getAllAirlines,
     createAirlineBack,
     deleteAirlineBack
  };

