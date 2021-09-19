const { Router } = require('express');
const UserController = require('./controllers/userController');
const SessionController = require('./controllers/sessionController');
const FormController = require('./controllers/formController');
const AnswerController = require('./controllers/answerController');
const EvaluationController = require('./controllers/evaluationController');

const ensureAuthMiddleware = require('./middlewares/ensureAuth');
const QuestionController = require('./controllers/questionController');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

// User
routes.post('/user/create', UserController.create);
routes.get('/user/read', ensureAuthMiddleware, UserController.read);
routes.delete('/user/delete/:id', ensureAuthMiddleware, UserController.delete);
routes.put('/user/update', ensureAuthMiddleware, UserController.update);
routes.post('/user/login', SessionController.create);
routes.get('/user/info', ensureAuthMiddleware, UserController.info);

// Form
routes.post('/form/create', ensureAuthMiddleware, FormController.create);
routes.get('/form/read', ensureAuthMiddleware, FormController.read);
routes.get('/form/index/:id', ensureAuthMiddleware, FormController.index);
routes.get('/form/enabled/:id', ensureAuthMiddleware, FormController.readEnabled);
routes.put('/form/update/:form_id', ensureAuthMiddleware, FormController.update);
routes.delete('/form/delete/:form_id', ensureAuthMiddleware, FormController.delete);

// Question
routes.post('/question/create/:form_id', ensureAuthMiddleware, QuestionController.create);
routes.get('/question/index/:form_id', ensureAuthMiddleware, QuestionController.index);
routes.get('/question/index/:form_id/user/:user_id', ensureAuthMiddleware, QuestionController.listByUserId);
routes.get('/question/read', ensureAuthMiddleware, QuestionController.list);
routes.put('/question/update/:question_id', ensureAuthMiddleware, QuestionController.update);
routes.delete('/question/delete/:question_id', ensureAuthMiddleware, QuestionController.delete);

// Answer
routes.post('/answer/create/:question_id', ensureAuthMiddleware, AnswerController.create);
routes.post('/answer/multcreate', ensureAuthMiddleware, AnswerController.createAnswers);
routes.get('/answer/read/:question_id', ensureAuthMiddleware, AnswerController.read);

// Evaluation
routes.post('/evaluate/create/:form_id', ensureAuthMiddleware, EvaluationController.create);
routes.get('/evaluate/read/:form_id', ensureAuthMiddleware, EvaluationController.read);
routes.get('/evaluate/read/:form_id/user/:user_id', ensureAuthMiddleware, EvaluationController.readById);
routes.get('/evaluate/list/:form_id', ensureAuthMiddleware, EvaluationController.list);

module.exports = routes;
