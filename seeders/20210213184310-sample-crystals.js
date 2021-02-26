'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Crystals", null, {});
    /**
     * Add seed commands here.
     */
   return await queryInterface.bulkInsert(
     "Crystals",
     [
       {
          name: "Amethyst",
          image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTeAkdIznKAn0Rw5ZHkM3-3pM2gB0FdOoOIB4HP0wfGhvONtuSWE5XO_k7tOPayExNh0wNF8X2U6w7kd1lEmZaAq8tJHidCEYfl8MmSqkS4nUqzkG37NKhy&usqp=CAc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
     ]
   );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Crystals", null, {});
  }
};
