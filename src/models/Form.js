const { Model } = require('sequelize');

class Form extends Model {
  static init(connection) {
    super.init({
    }, {
      sequelize: connection,
    });
  }
}

module.exports = Form;
