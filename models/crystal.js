'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crystal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Crystal.User = Crystal.belongsToMany(Users, {
      Crystal.User.belongsToMany(Users, {
        through: 'favourites',
        as: 'users',
        foreignKey: 'userId',
      })

      // Users.belongsToMany(models.Groups, {
      //   through: 'GroupUsers',
      //   as: 'groups',
      //   foreignKey: 'userId'
      // });
    }
  };
  Crystal.init({
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    otherNames: DataTypes.STRING,
    colour: DataTypes.ARRAY,
    chakra: DataTypes.ARRAY,
    createdAt: new Date(),
    createdBy: DataTypes.STRING,
    updatedAt: new Date(),
  }, {
    sequelize,
    modelName: 'Crystal',
  });
  return Crystal;
};