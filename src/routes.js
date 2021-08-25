const { Router } = require('express');
const UserController = require('./controllers/userController');
const SessionController = require('./controllers/sessionController');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.get('/user/read', UserController.read);
routes.post('/user/create', UserController.create);

routes.post('/user/login', SessionController.create);

module.exports = routes;
