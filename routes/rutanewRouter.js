const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.send("hola soy rutanew")
})

module.exports = router;


