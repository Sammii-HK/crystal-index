'use strict';
module.exports = (sequelize, DataTypes) => {

  const Crystal = sequelize.define('Crystal', {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    otherNames: DataTypes.STRING,
    colour: DataTypes.ARRAY(DataTypes.STRING),
    chakra: DataTypes.ARRAY(DataTypes.STRING),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  Crystal.associate = function(models) {
    Crystal.belongsToMany(models.User, {
      through: 'Favourites',
      as: 'users',
      foreignKey: 'favouriteId',
    });
    // Crystal.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'createdBy',
    // });
  };

  // node_modules/.bin/sequelize model:generate --name users_crystals --attributes userId:integer,crystalId:integer

  return Crystal;
};