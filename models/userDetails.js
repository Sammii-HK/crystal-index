module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mobileNum: DataTypes.STRING,
    address: DataTypes.TEXT,
    
  }, {});
  // Example of belongsTo association
  // This is commented because we don't need this
  // UserDetails.associate = function(models) {
  //   UserDetails.belongsTo(models.User, { 
  //     foreignKey: 'id', 
  //     as: 'user' 
  //   });
  // }

  return UserDetails;
};
