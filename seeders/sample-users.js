'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        userName: 'user',
        email: 'demo@demo.com',
        password: 'pass',
        createdAt: new Date(),
        updatedAt: new Date(),
        favourites: [0]
      }], {});
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};