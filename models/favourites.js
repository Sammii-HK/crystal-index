'use strict';
module.exports = (sequelize, DataTypes) => {

  const favourites = sequelize.define('favourites', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  favourites.associate = function(models) {
    // favourites.belongsTo(models.User, { 
    //   foreignKey: 'id', 
    //   as: 'userId' 
    // });
    // favourites.belongsTo(models.Crystal, { 
    //   foreignKey: 'id', 
    //   as: 'crystalId' 
    // });
    
  }

  return favourites;
};