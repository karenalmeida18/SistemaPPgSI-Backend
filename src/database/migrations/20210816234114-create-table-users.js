module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      usp_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      user_type: {
        type: Sequelize.ENUM(['ccp', 'advisor', 'student']),
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
