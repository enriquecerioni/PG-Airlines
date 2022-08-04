const { getAllSales, createSale } = require('../controllers/SaleController');
const { Router } = require('express');

const saleRouter = Router();

saleRouter.get('/', getAllSales);
saleRouter.post('/', createSale);


module.exports = saleRouter