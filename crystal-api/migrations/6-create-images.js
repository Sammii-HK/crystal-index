module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('crystals', 'image', { transaction: t }),

        queryInterface.createTable('images', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
          },
          type: {
            type: Sequelize.STRING,
          },
          file: {
            type: Sequelize.BLOB,
          },
          crystalId: {
            type: Sequelize.DataTypes.INTEGER,
            references: { model: 'crystals', key: 'id' },
          }
        }, { transaction: t }),
      ]);
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('images', { transaction: t }),

        queryInterface.addColumn('crystals', 'image', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),    
      ]);
    });
  }
};
