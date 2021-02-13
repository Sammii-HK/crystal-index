'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
   return await queryInterface.bulkInsert(
     "Users",
     [
       {
         firstName: "Sammii",
         lastName: "H",
         email: "sam@email.com",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         firstName: "George",
         lastName: "William",
         email: "g.w@email.com",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ]
   );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
