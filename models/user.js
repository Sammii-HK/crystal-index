'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  User.associate = function(models) {
    User.belongsToMany(models.Crystal, {
      through: 'Favourites',
      as: 'crystals',
      foreignKey: 'userId',
    });
    User.hasOne(models.UserDetails, { 
      foreignKey: 'userId', 
      as: 'userDetails' 
    });
    // User.belongsTo(models.Crystal, {
    //   foreignKey: 'crystalId',
    //   as: 'createdBy',
    // });
  };

  return User;
};

console.log('User', this.User);