const { Router } = require('express');
const { Comment } = require('../db');
const { Airline }= require('../db');
const { Order }= require('../db');
const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll()

        allComments.length ? 
        res.status(200).json(allComments)
        : res.status(404).send('no hay comentarios')        

    } catch (error) {
        res.status(404).send('No hay comentarios')
    }
})

commentsRouter.post('/', async (req, res) => {
    try {
        const { airlineId, comment, rating, moreInfo, name } = req.body
        console.log(airlineId, comment, rating, moreInfo, name);
        
        let newComment = await Comment.create({
            comment,
            rating,
            moreInfo,
            name,
            airlineId
        })

        let airlineComments = await Airline.findOne({
            where: {
                userId: airlineId
            }
        })

        await airlineComments.addComment(newComment)

        return res.status(200).send(newComment)

    } catch (error) {
        res.status(404).send('No se pudo cargar el comentario')
    }
});

commentsRouter.put('/', async (req, res) => {
    try {
        const { orderID, detail } = req.body
        console.log(orderID, detail)
        
        if(orderID) {
            console.log('aca')
            let reviewID = await Order.update(
            {
                stocks: [detail],
            }, 
            { 
                where: { id: orderID }, 
            }
        )
            console.log("entroo",reviewID)
        }else{
            return res.status(400).json({error: "manda un id fracasado"})
        }
        
         res.status(200).json({message: "todo bien"})

    } catch (error) {
        res.status(404).send('No se pudo cambiar')
    }
});

module.exports = commentsRouter;