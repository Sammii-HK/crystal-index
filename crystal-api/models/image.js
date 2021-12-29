module.exports = (queryInterface, Sequelize) => {
  const image = queryInterface.define('image', {
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    file: Sequelize.BLOB,
  }, {
    timestamps: false
  });

  return image;
};
