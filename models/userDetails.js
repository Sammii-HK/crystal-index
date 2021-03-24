module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT,
    
  }, {});
  // Example of belongsTo association
  // This is commented because we don't need this
  userDetails.associate = function(models) {
    userDetails.belongsTo(models.user, { 
      foreignKey: 'id', 
      as: 'userDetails',
      onDelete: 'CASCADE',
    });
  }

  return userDetails;
};
