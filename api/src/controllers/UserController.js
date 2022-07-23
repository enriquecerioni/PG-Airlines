
const {User} = require("../db");



async function createUser(req,res){
    const  {email,name,photo}=req.body
        try {
            if(email && name && photo){
                let user=await User.findAll({
                    where:{email:email}
                })
                if(user.length){} //return res.status(400).json("This user has been created before")
                else{
                let userCreated = await User.create({
                    email:email,
                    name:name,
                    image:photo
                })
                return res.status(201).json(userCreated)
            }
            }
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

module.exports = {
    createUser,
   
  };