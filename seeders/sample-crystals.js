'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Crystals', [{
        name: "Amethyst",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTeAkdIznKAn0Rw5ZHkM3-3pM2gB0FdOoOIB4HP0wfGhvONtuSWE5XO_k7tOPayExNh0wNF8X2U6w7kd1lEmZaAq8tJHidCEYfl8MmSqkS4nUqzkG37NKhy&usqp=CAc",
        bio: "Lorem ipsum",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Crystals', null, {});
  }
};