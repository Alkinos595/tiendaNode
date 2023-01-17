const express = require('express');

const productsRouter = require('./productsRouter.js');
const baseRouter = require('./baseRouter.js');
const rutanewRouter = require('./rutanewRouter.js');
const usersRouter = require('./usersRouter.js')
const categoriesRouter = require('./categoriesRouter.js')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/',baseRouter);
  router.use('/rutanew',rutanewRouter);
  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
}

module.exports = routerApi;

