
const {User} = require("../db");



async function createUser(req,res){
    const  {email,name}=req.body
        try {
            if(email && name ){
                let user=await User.findAll({
                    where:{email:email}
                })
                if(user.length){} //return res.status(400).json("This user has been created before")
                else{
                let userCreated = await User.create({
                    email:email,
                    name:name,
                })
                return res.status(201).json(userCreated)
            }
            }
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

async function updateToAdmin(req,res){
    try {
        const {email}=req.body;
        let user= await User.update(
        {
            permissions:true,
        },
        {
            where:{email:email},
        }
        );
      
        res.send("nashe")
    } catch (error) {
        alert(error)
    }
}
module.exports = {
    createUser,
    updateToAdmin
   
  };