module.exports = (queryInterface, Sequelize) => {
  const location = queryInterface.define('location', {
    placeName: Sequelize.STRING,
    country: Sequelize.STRING,
    lat: Sequelize.STRING,
    long: Sequelize.STRING,
  }, {
    timestamps: false
  });
  location.associate = (models) => {
    // 1:n
    location.hasMany(models.crystal, { foreignKey: 'originId', as: 'crystalsOfOrigin' });

}

  return location;
};