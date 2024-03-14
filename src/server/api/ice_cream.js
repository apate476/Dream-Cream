const express = require('express')
const icRouter = express.Router()
const { getAllIceCream, getIceCreamByName } = ('../db/index')

icRouter.get('/', async (req, res, next) =>{
    try {
        const iceCream = await getAllIceCream()
        res.send(iceCream)
    }   catch(err) {
        next (err)
    }
})
