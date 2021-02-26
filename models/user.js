'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.Crystals.belongsToMany(Crystals, {
        through: 'favourites',
        as: 'crystals',
        foreignKey: 'crystalId',
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

const usersWithCrystals = await User.findAll({
  include: [{model: Crystal}]
})

console.log(usersWithCrystals[0])

// const pugsWithFriends = await Pug.findAll({
//   include: [{model: Friend}]
// })

// console.log(pugsWithFriends[0])