const { Sale } = require("../db");

async function createSale(req, res) {
  try {
    const { sales } = req.body;
    if (sales.length) {
      sales.map((sale) => {
        Sale.create({
          idFlight: sale.id,
          amount: sale.amount,
          airlineId: sale.airlineId,
          price: sale.price,
        });
      });
    }
    res.status(201).json({ message: "Sale created" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
}
async function getAllSales(req, res, next) {
  try {
    let allSales = await Sale.findAll();
    if (allSales.length) {
      res.status(200).json(allSales);
    } else {
      res.status(404).send({ message: "Users not found" });
    }
  } catch (error) {
    next(error.message);
  }
}

module.exports = {
  getAllSales,
  createSale,
};
