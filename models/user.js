'use strict';
module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  user.associate = function(models) {
    user.hasOne(models.userDetails, { 
      foreignKey: 'id', 
      as: 'userDetails' ,
      onDelete: 'CASCADE',
    });
    // user.hasMany(models.Crystal, {
    //   foreignKey: 'crystalId',
    //   as: 'createdBy',
    // });
    // user.belongsToMany(models.Crystal, {
    //   through: 'favourites',
    //   foreignKey: 'userId',
    //   as: 'user',
    // });
  };

  return user;
};

console.log('user', this.user);