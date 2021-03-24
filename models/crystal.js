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

  // crystal.associate = function(models) {
  //   crystal.belongsToMany(models.User, {
  //     through: 'favourites',
  //     foreignKey: 'id',
  //     as: 'userId',
  //   });
  //   crystal.hasOne(models.User, { 
  //     foreignKey: 'id', 
  //     as: 'createdBy',
  //   });
  // };

  // node_modules/.bin/sequelize model:generate --name users_crystals --attributes userId:integer,crystalId:integer

  return crystal;
};