module.exports = (queryInterface, Sequelize) => {
  const location = queryInterface.define('location', {
    placeName: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.STRING,
    long: Sequelize.STRING,
  }, {
    timestamps: false
  });
  // Example of belongsTo association
  // This is commented because we don't need this
  location.associate = (models) => {
  //  1:1 association type
  //   location.belongsTo(models.user, { foreignKey: 'id', as: 'user' });
  location.belongsTo(models.crystal, { foreignKey: 'id', as: 'crystalLocations' });
  // location.hasMany(models.crystal, { foreignKey: 'id', as: 'crystalLocations' });
  // location.belongsToMany(models.crystalLocation, { foreignKey: 'id', as: 'crystalLocations', through: 'crystalLocation' });
  // user.hasMany(models.crystal, { foreignKey: 'createdBy', as: 'createdCrystals' });

}

  return location;
};
