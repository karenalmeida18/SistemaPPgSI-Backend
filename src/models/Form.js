const { Model, DataTypes } = require('sequelize');

class Form extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN,
    }, {
      sequelize: connection,
    });
  }
}

module.exports = Form;
