const express = require('express');
const cors = require('cors')
const routerApi = require('./routes/routersIndex.js')
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/errorHandler.js')
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500','http://localhost:5500','http://127.0.0.1:3000','http://localhost:3000'];
const options = {
  origin:(origin,callback)=>{
    if(whitelist.includes(origin)||!origin){
      callback(null,true);
    }else{
      callback(new Error('Access denied'),false);
    }
  }
}
app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  //console.log(`Servidor ejecutandose en http://localhost:${port}/`)
});
