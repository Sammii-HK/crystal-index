const db = require('../models');

module.exports = [
  {
    method: 'POST',
    path: '/favourites/addCrystal',
    handler: async (req, h) => {
      const { userId, crystalId } = req.payload;
      try {
        const results = await db.favourite.create({
          userId,
          crystalId,
        });
        return {
          success: true,
          results,
        };
      } catch (e) {
        console.log('error creating group:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  },
  {
    method: 'GET',
    path: '/favourites',
    handler: async (_, h) => {
      try {
        const results = await db.favourite.findAll({});

        return results;
        
      } catch (e) {
        console.log('error fetching users:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'DELETE',
    path: '/favourites/removeCrystal',
    handler: async (req, h) => {
      const { userId, crystalId } = req.payload;
      try {
        const results = await db.favourite.destroy({
          where: {
            userId,
            crystalId,
          }
        })
        return {
          success: true,
          results,
        };
      } catch (e) {
        console.log('error creating group:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  },
];