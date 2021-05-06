'use strict';
module.exports = (queryInterface, Sequelize) => {

  const user = queryInterface.define('user', {
    userName: Sequelize.STRING,
    email: Sequelize.STRING,
  }, {
    timestamps: false
})

  user.associate = (models) => {
    // 1:1 assocation type
    user.hasOne(models.userDetail, { foreignKey: 'id', as: 'userDetail', onDelete: 'CASCADE' });
    // 1:n
    user.hasMany(models.crystal, { foreignKey: 'userId', as: 'createdCrystals' });
    // n:m
    user.belongsToMany(models.crystal, { 
      foreignKey: 'userId', 
      through: models.favourite, 
      as: 'favouriteCrystals', 
    });
  };

  return user;
};

console.log('user', this.user);