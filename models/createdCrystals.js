'use strict';
module.exports = (sequelize, DataTypes) => {

  const createdCrystal = sequelize.define('createdCrystal', {
    userId: DataTypes.INTEGER,
    crystalId: DataTypes.INTEGER,
  })

  createdCrystal.associate = function(models) {
    // createdCrystal.belongsTo(models.User, { 
    //   foreignKey: 'id', 
    //   as: 'userId' 
    // });
    // createdCrystal.belongsTo(models.Crystal, { 
    //   foreignKey: 'id', 
    //   as: 'crystalId' 
    // });
  }

  return createdCrystal;
};