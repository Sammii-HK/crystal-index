'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favourites', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,

        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE',
      },
      crystalId: {
        allowNull: false,
        type: Sequelize.INTEGER,

        references: { model: 'crystal', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favourites');
  }
};