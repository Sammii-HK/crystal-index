'use strict';
module.exports = (sequelize, DataTypes) => {

  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    timestamps: false
})

  users.associate = (models) => {
    users.hasOne(models.userDetails, { foreignKey: 'id', as: 'userDetails', onDelete: 'CASCADE' });

    // users.hasMany(models.Crystal, {
    //   foreignKey: 'crystalId',
    //   as: 'createdBy',
    // });
    // users.belongsToMany(models.Crystal, {
    //   through: 'favourites',
    //   foreignKey: 'userId',
    //   as: 'users',
    // });
  };

  return users;
};

console.log('users', this.users);