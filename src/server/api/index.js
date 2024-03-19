const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball')
const usersRouter = require('./users');
const iceCreamRouter = require('./ice_cream');
const ordersRouter = require('./orders');

apiRouter.use(volleyball);
apiRouter.use('/users', usersRouter);
apiRouter.use('/ice_cream', iceCreamRouter);
apiRouter.use('/orders', ordersRouter);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('REPLACE_ME')) {
    // TODO - Get JUST the token out of 'auth'
    const token = 'REPLACE_ME';
    
    try {
      const parsedToken = 'REPLACE_ME';
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const icRouter = require('./ice_cream');
apiRouter.use('/ice_cream', icRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;