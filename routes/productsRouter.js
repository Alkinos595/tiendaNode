const express = require('express');
const productService = require('../services/productServices.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema.js');
const router = express.Router();
const service = new productService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send("Hola soy un filter")
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  })


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json({
      message: "Created",
      newProduct
    })
  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product)
    } catch (error) {
      next(error);
    }
  })
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body;
  res.json({
    message: 'Partial updated',
    data: body,
    id
  })
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const respuesta = await service.delete(id);
  res.json(respuesta)
})

module.exports = router;
