'use strict';
module.exports = (sequelize, DataTypes) => {

  const CreatedCrystal = sequelize.define('CreatedCrystal', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  CreatedCrystal.associate = function(models) {
    CreatedCrystal.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user' 
    });
    CreatedCrystal.belongsTo(models.Crystal, { 
      foreignKey: 'crystalId', 
      as: 'crystal' 
    });
    
  }

  return CreatedCrystal;
};