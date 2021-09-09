const { Model, DataTypes } = require('sequelize');

class Question extends Model {
  static init(connection) {
    super.init({
      description: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.Form, { foreignKey: 'form_id', as: 'forms' });
  }
}

module.exports = Question;
