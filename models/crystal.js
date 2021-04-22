'use strict';
module.exports = (queryInterface, Sequelize) => {

  const crystal = queryInterface.define('crystal', {
    name: Sequelize.STRING,
    bio: Sequelize.STRING,
    image: Sequelize.STRING,
    otherNames: Sequelize.STRING,
    colour: Sequelize.ARRAY(Sequelize.STRING),
    chakra: Sequelize.ARRAY(Sequelize.STRING),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  crystal.associate = (models) => {
    crystal.belongsTo(models.user, { foreignKey: 'id', as: 'createdBy' });
  }

  
  return crystal;
};