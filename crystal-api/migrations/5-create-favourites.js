'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favourites', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,

        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      crystalId: {
        allowNull: false,
        type: Sequelize.INTEGER,

        references: { model: 'crystals', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favourites');
  }
};
