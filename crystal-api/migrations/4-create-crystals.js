'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crystals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      otherNames: {
        type: Sequelize.STRING
      },
      colour: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
          values: [
            'white',
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'indigo',
            'violet',
          ],
            // required: 'Please select a valid colour',
        }))
      },
      chakra: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
          values: [
            'Crown',
            'Third Eye',
            'Throat',
            'Heart',
            'Solar Plexus',
            'Sacral',
            'Root',
          ]
        }))
        // required: 'Please select a valid chakra',
        // enum: chakras
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        // allowNull: false,
        type: Sequelize.INTEGER,

        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      originId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
  
        references: { model: 'locations', key: 'id' },
        onDelete: 'CASCADE',
      },
      mementoId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
  
        references: { model: 'locations', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crystals');
  }
};
