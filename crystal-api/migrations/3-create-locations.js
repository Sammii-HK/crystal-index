module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    placeName: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.STRING,
    },
    long: {
      type: Sequelize.STRING,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('locations'),
};
