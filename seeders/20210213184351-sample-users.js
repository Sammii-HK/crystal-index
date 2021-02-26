'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add seed commands here.
     */
   return await queryInterface.bulkInsert(
     "Users",
     [
       {
          firstName: "Sammii",
          lastName: "H",
          email: "sam@email.com",
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
          favourites: [
            {
              crystalId: 1,
            }
          ]
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
