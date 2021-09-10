const { Model, DataTypes } = require('sequelize');

class Evaluation extends Model {
  static init(connection) {
    super.init({
      note: DataTypes.TEXT,
      selfguard: DataTypes.TEXT,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'usp_code', as: 'users' });
    this.belongsTo(models.Form, { foreignKey: 'form_id', as: 'forms' });
  }
}

module.exports = Evaluation;
