const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Form = require('../models/Form');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const connection = new Sequelize(dbConfig);

User.init(connection);
Form.init(connection);
Question.init(connection);
Answer.init(connection);

Question.associate(connection.models);
Answer.associate(connection.models);

module.exports = connection;
