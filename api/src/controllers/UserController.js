const { User } = require("../db");

async function getAllUsers(req, res, next) {
  try {
    let allUsers = await User.findAll();
    if (allUsers.length) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).send({ msg: "Users not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res) {
  const { email, name } = req.body;
  try {
    if (email && name) {
      let user = await User.findAll({
        where: { email: email },
      });
      if (user.length) {
      } //return res.status(400).json("This user has been created before")
      else {
        let userCreated = await User.create({
          email: email,
          name: name,
        });
        return res.status(201).json(userCreated);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateToAdmin(req, res) {
  try {
    const { email } = req.body;
    if (email) {
      let user = await User.update(
        {
          permissions: true,
        },
        {
          where: { email: email },
        }
      );
        if(user[0] === 0){
            res.status(404).send("User not Found");
        }else{
            res.send("User edited.")
        }
    }
  } catch (error) {
    alert(error);
  }

//   try {
//     const { email } = req.body;
//     if (email) {
//       let user = await User.findOne({
//         where: { email: email },
//       });
//       if (user.length) {
//         userEdit = await User.update(
//           { permissions: true },
//           { where: { email: email } }
//         );
//         res.send("nashe");
//       }else {
//         res.status(404).send("User not found")
//       }
      
//     }
//   } catch (error) {
//     res.send(error);
//   }
}
module.exports = {
  createUser,
  updateToAdmin,
  getAllUsers
};
