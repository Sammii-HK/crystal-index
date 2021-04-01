module.exports = (sequelize, DataTypes) => {
  const userDetail = sequelize.define('userDetail', {
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT,
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
