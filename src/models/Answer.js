const { Model, DataTypes } = require('sequelize');

class Answer extends Model {
  static init(connection) {
    super.init({
      answer: DataTypes.TEXT,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'questions' });
  }
}

module.exports = Answer;
