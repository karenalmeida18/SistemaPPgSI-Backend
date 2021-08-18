require('dotenv').config();
require('./database');

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
