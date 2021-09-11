const { Model, DataTypes } = require('sequelize');

class Question extends Model {
  static init(connection) {
    super.init({
      description: DataTypes.TEXT,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.Form, { foreignKey: 'form_id', as: 'forms' });
    this.hasMany(models.Answer, { foreignKey: 'question_id', as: 'answers' });
  }
}

module.exports = Question;
