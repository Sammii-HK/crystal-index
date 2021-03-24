'use strict';
module.exports = (sequelize, DataTypes) => {

  const CreatedCrystal = sequelize.define('CreatedCrystal', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  CreatedCrystal.associate = function(models) {
    // CreatedCrystal.belongsTo(models.User, { 
    //   foreignKey: 'id', 
    //   as: 'userId' 
    // });
    // CreatedCrystal.belongsTo(models.Crystal, { 
    //   foreignKey: 'id', 
    //   as: 'crystalId' 
    // });
  }

  return CreatedCrystal;
};