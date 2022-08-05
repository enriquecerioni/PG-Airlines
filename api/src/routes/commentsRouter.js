const { Router } = require('express');
const { Comment } = require('../db');
const { Airline }= require('../db');
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

        // console.log(airlineId, comment, rating, moreInfo, name)

        let newComment = await Comment.create({
            comment,
            rating,
            moreInfo,
            name,
            airlineId
        })

        // console.log(newComment)

        let airlineComments = await Airline.findOne({
            where: {
                userId: airlineId
            }
        })

        // console.log(flightComments)

        await airlineComments.addComment(newComment)

        return res.status(200).send(newComment)

    } catch (error) {
        res.status(404).send('No se pudo cargar el comentario')
    }
});

module.exports = commentsRouter;