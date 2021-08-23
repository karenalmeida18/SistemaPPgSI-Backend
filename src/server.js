require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
require('./database');

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

module.exports = app.listen(process.env.DB_PORT || 3333);
