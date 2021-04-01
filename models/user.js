'use strict';
module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    timestamps: false
})

  user.associate = (models) => {
    // 1:1 assocation type
    user.hasOne(models.userDetail, { foreignKey: 'id', as: 'userDetail', onDelete: 'CASCADE' });
  };

  return user;
};

console.log('user', this.user);