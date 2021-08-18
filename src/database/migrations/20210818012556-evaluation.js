module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evaluation', {
      answers_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      awnswer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ressalva: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      usp_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'usp_code' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'forms', key: 'form_id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('evaluation');
  },
};
