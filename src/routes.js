const { Router } = require('express');
const UserController = require('./controllers/userController');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));
routes.get('/user/read', UserController.read);
routes.post('/user/create', UserController.create);

module.exports = routes;
