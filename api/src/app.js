const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')

require('./db.js');

const server = express();

server.name = 'API';
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));//el .use quiere decir que le diga a mi req que entre ahi, eso significa
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev')); //morgan da un output en la consola
server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); en el puerto 3000 es aqui porque es donde va mi front // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); //el .use quiere decir que le diga a mi req que entre ahi, eso significa.


//y este es mi middleware de control de errores

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars //  aqui la req entra a morgan que es el middleware y conteinua su camino
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
