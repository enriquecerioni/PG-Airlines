const { Airline } = require("../db");

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
    getAllAirlines
  };