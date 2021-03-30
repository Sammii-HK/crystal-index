module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
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
  userDetails.associate = (models) => {
    userDetails.belongsTo(models.users, { foreignKey: 'id', as: 'users' });
  }

  return userDetails;
};
