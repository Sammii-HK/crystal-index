'use strict';
module.exports = (sequelize, DataTypes) => {

  const Favourites = sequelize.define('Favourites', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  Favourites.associate = function(models) {
    Favourites.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user' 
    });
    Favourites.belongsTo(models.Crystal, { 
      foreignKey: 'crystalId', 
      as: 'crystal' 
    });
    
  }

  return Favourites;
};