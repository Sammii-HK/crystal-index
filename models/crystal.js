'use strict';
// const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  // const Users = sequelize.models.User;

  const Crystal = sequelize.define('Crystal', {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    otherNames: DataTypes.STRING,
    colour: DataTypes.ARRAY,
    chakra: DataTypes.ARRAY,
    createdAt: new Date(),
    createdBy: DataTypes.STRING,
    updatedAt: new Date(),
  });
  // class Crystal extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here 🤘
  //   }
  // };

  // Crystal.init({
    
  // }, {
  //   sequelize,
  //   modelName: 'Crystal',
  // });

  Crystal.associate = function(models) {
    Crystal.belongsToMany(models.User, {
      through: 'Favourites',
      as: 'users',
      foreignKey: 'favouriteId',
    });
  };

  return Crystal;
};