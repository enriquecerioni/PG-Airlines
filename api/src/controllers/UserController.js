const { User } = require("../db");
const { deleteAuthUser, resetPasswordFirebase,disableAuthUser } = require("../db_flight/eliminar");
const firebase=require('firebase')

async function getAllUsers(req, res, next) {
  try {
    let allUsers = await User.findAll();
    if (allUsers.length) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).send({ message: "Users not found" });
    }
  } catch (error) {
    next(error.message);
  }
}

async function createUser(req, res) {
  const { email, name, uid, img,emailVerified } = req.body;
  console.log(email, name, uid, img,emailVerified);
  try {
    if (email && name && uid) {
      let user = await User.findAll({
        where: { email: email },
      });
      if (user.length) {
      } //return res.status(400).json("This user has been created before")
      else {
        let userCreated = await User.create({
          email: email,
          name: name,
          uid: uid,
          image: img,
          emailVerificated: emailVerified && emailVerified
        });
        return res.status(201).json(userCreated);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function verificateEmail(req, res) {
  try {
    const { email } = req.body;
    //console.log(email)
    if (email) {
     // console.log("este mailll"," ",email)
      let user = await User.update(
        {
          emailVerificated: true,
        },
        {
          where: { email: email },
        }
      );
      if (user[0] === 0) {
        res.status(404).json({ error: "User not Found" });
      } else {
        res.json({ message: "User edited." });
      }
    }
  } catch (error) {
    console.log(error);
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
      if (user[0] === 0) {
        res.status(404).json({ error: "User not Found" });
      } else {
        res.json({ message: "User edited." });
      }
    }
  } catch (error) {
    console.log(error);
  }
}



async function deleteUserBack(req, res) {
  const { email } = req.params;
  try {
    console.log(email);
    if (email) {
      let esta = await User.findOne({ where: { email: email } });
      if (esta.email) {
        await User.destroy({
          where: { email: email },
          force: true,
        });

        res.status(201).json({ message: "User eliminated" });
      } else return res.status(404).json({ error: "User not found" });
    } else res.status(404).json({ error: "Email invalid" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




async function deleteUserAuth(req, res, next) {
  try {
    const { uid } = req.params;
    await deleteAuthUser(uid);
    res.json({ message: "deleted auth user" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




async function getAllUsersFirebaseBack (req,res){
  try {
    const dbFirebase=firebase.firestore();
    let users=await dbFirebase.collection("users").get()
    res.status(200).json(users.docs.map((doc)=>doc.data()))
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

async function resetPassword(req, res) {
  const email = req.params.email 
  try {
    if (email) {
      // console.log(email)
      //res.status(200).send(resetPasswordFirebase(email))
      await resetPasswordFirebase(email)
      return res.status(200).send({ msg: "Salio todo bien"})
    }
  } catch (error) {
    return res.status(400).send({ error: "Salio mal"})
  }
}

async function disableUserAuth(req, res) {
  const {uid} = req.body 
  try {
    if (uid) {
      // console.log(email)
      //res.status(200).send(resetPasswordFirebase(email))
      await disableAuthUser(uid)
      return res.status(200).send({ msg: "Salio todo bien"})
    }else{
      return res.status(400).json({msg: "Falta mail"})
    }
  } catch (error) {
    return res.status(400).send({ error: "Salio mal"})
  }
}



module.exports = {
  createUser,
  updateToAdmin,
  getAllUsers,
  deleteUserBack,
  deleteUserAuth,
  getAllUsersFirebaseBack,
  resetPassword,
  verificateEmail,
  disableUserAuth
};
