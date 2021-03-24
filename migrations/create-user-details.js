module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserDetails', {
    userId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      // references: { model: 'User', key: 'id' },
      // onDelete: 'CASCADE',
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    mobileNum: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserDetails'),
};