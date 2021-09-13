const { Model, DataTypes } = require('sequelize');

class Evaluation extends Model {
  static init(connection) {
    super.init({
      note_advisor: DataTypes.TEXT,
      note_ccp: DataTypes.TEXT,
      selfguard_advisor: DataTypes.TEXT,
      selfguard_ccp: DataTypes.TEXT,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    this.belongsTo(models.Form, { foreignKey: 'form_id', as: 'forms' });
  }
}

module.exports = Evaluation;
