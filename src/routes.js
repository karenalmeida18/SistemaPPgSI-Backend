const { Router } = require('express');
const UserController = require('./controllers/userController');
const SessionController = require('./controllers/sessionController');

const ensureAuthMiddleware = require('./middlewares/ensureAuth');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.post('/user/create', UserController.create);
routes.get('/user/read', ensureAuthMiddleware, UserController.read);
routes.delete('/user/delete/:id', ensureAuthMiddleware, UserController.delete);

routes.post('/user/login', SessionController.create);

module.exports = routes;
