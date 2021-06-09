'use strict';
module.exports = (queryInterface, Sequelize) => {
  
  const favourite = queryInterface.define('favourite', {
    userId: Sequelize.INTEGER,
    crystalId: Sequelize.INTEGER,
  }, {
    timestamps: false
  });

  favourite.associate = (models) => {
  };

  

  return favourite;
};