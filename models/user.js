'use strict';
// const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  // const Crystals = sequelize.models.Crystal;

  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // };
  // User.init({
  // }, {
  //   sequelize,
  //   modelName: 'User',
  // });

  User.associate = function(models) {
    User.belongsToMany(models.Crystal, {
      through: 'Favourites',
      as: 'crystals',
      foreignKey: 'userId',
    });
  };

  return User;
};

console.log('User', User);