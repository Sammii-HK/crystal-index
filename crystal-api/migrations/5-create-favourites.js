'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      crystalId: {
        allowNull: false,
        type: Sequelize.INTEGER,

        references: { model: 'crystals', key: 'id' },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favourites');
  }
};
