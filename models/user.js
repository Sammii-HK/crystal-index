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
    User.hasOne(models.UserDetails, { 
      foreignKey: 'userId', 
      as: 'userDetails' ,
      onDelete: 'CASCADE'
    });
    // User.hasMany(models.Crystal, {
    //   foreignKey: 'crystalId',
    //   as: 'createdBy',
    // });
    // User.belongsToMany(models.Crystal, {
    //   through: 'favourites',
    //   foreignKey: 'userId',
    //   as: 'user',
    // });
  };

  return User;
};

console.log('User', this.User);