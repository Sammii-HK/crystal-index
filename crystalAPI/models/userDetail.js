module.exports = (queryInterface, Sequelize) => {
  const userDetail = queryInterface.define('userDetail', {
    password: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    mobileNum: Sequelize.STRING,
    address: Sequelize.TEXT,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  // Example of belongsTo association
  // This is commented because we don't need this
  // userDetail.associate = (models) => {
  //  1:1 association type
  //   userDetail.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
  // }

  return userDetail;
};
