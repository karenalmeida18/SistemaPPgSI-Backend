module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('forms', {
      form_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('forms');
  },
};
