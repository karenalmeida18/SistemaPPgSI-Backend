const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      usp_code: DataTypes.INTEGER,
      name: DataTypes.STRING,
      user_type: DataTypes.ENUM(['ccp', 'advisor', 'student']),
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      lattes: DataTypes.STRING,
      lattes_date: DataTypes.DATE,
      advisor: DataTypes.STRING,
      course: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }
}

module.exports = User;
