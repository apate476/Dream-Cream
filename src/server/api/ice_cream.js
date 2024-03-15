const express = require('express')
const icRouter = express.Router()
const { getAllIceCream, getIceCreamByName } = require('../db/index')

icRouter.get('/', async (req, res, next) =>{
    try {
        const iceCream = await getAllIceCream()
        res.send(iceCream)
    }   catch(err) {
        console.log(err)
        next (err)
    }
})

module.exports = icRouter
