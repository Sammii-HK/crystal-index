'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crystalCreatedBy', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        // references: { model: 'User', key: 'id' },
        // onDelete: 'CASCADE',
      },
      crystalId: {
        type: Sequelize.INTEGER,
        // references: { model: 'Crystal', key: 'id' },
        // onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crystalCreatedBy');
  }
};