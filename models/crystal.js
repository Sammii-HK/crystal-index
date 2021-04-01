'use strict';
module.exports = (sequelize, DataTypes) => {

  const crystal = sequelize.define('crystal', {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    otherNames: DataTypes.STRING,
    colour: DataTypes.ARRAY(DataTypes.STRING),
    chakra: DataTypes.ARRAY(DataTypes.STRING),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  crystal.associate = (models) => {
    crystal.belongsTo(models.user, { foreignKey: 'id', as: 'createdBy' });
  }

  
  return crystal;
};