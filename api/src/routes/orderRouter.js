const { Router } = require('express');
const { Order } = require('../db');
const { User }= require('../db');
const orderRouter = Router()

require('dotenv').config()

orderRouter.get('/', async (req, res) => {
    try {
        
        let allOrders = await Order.findAll()

        allOrders.length ? 
        res.status(200).send(allOrders)
        : res.status(400).send('no hay nada')

    } catch (error) {
        console.log(error)
    }
})

orderRouter.post('/', async (req, res) => {
    const { stocks, price, userId, idpurchase, creationdate } = req.body
    try {

        let newOrder = await Order.create({
            stocks,
            price,
            idpurchase,
            creationdate
        });

        let cliente =  await User.findOne({
            where: {
                id: userId
            }
        })

        console.log(cliente)

        await cliente.addOrder(newOrder)

        res.send(newOrder)

    } catch (error) {
        res.status(400).send(error)
    }  
})


module.exports = orderRouter