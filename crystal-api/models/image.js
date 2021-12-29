module.exports = (queryInterface, Sequelize) => {
  const image = queryInterface.define('image', {
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    file: Sequelize.BLOB,
  }, {
    timestamps: false
  });

  image.associate = (models) => {
    image.belongsTo(models.crystal, { foreignKey: 'crystalId', as: 'image' })
  };

  return image;
};
