'use strict';
module.exports = (sequelize, DataTypes) => {

  const Favourites = sequelize.define('Favourites', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  Favourites.associate = function(models) {
    // Favourites.belongsTo(models.User, { 
    //   foreignKey: 'id', 
    //   as: 'userId' 
    // });
    // Favourites.belongsTo(models.Crystal, { 
    //   foreignKey: 'id', 
    //   as: 'crystalId' 
    // });
    
  }

  return Favourites;
};