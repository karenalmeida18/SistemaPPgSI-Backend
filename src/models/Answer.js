const { Model, DataTypes } = require('sequelize');

class Answer extends Model {
  static init(connection) {
    super.init({
      answer: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'usp_code', as: 'users' });
    this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'questions' });
  }
}

module.exports = Answer;
