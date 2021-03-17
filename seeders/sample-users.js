'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'Anne',
        lastName: 'Doe',
        email: 'demo@demo.com',
        password: '$321!pass!123$',
        createdAt: new Date(),
        updatedAt: new Date(),
        favourites: [0]
      }], {});
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};