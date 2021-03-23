const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/favourites/create',
  handler: async (req, h) => {
    const { groupName } = req.payload;
    try {
      await db.favourites.create({
        groupName,
      });
      return 'ok';
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'POST',
  path: '/favourites/addUser',
  handler: async (req, h) => {
    const { userId, crystalId } = req.payload;
    try {
      const results = await db.users_crystals.create({
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
}, {
  method: 'GET',
  path: '/favourites',
  handler: async (_, h) => {
    try {
      const results = await db.favourites.findAll({
        attributes: ['id', 'groupName'],
      });
      return results;
    } catch (e) {
      console.log('error creating group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/groups/{crystalId}/{userId}',
  handler: async (req, h) => {
    const { crystalId, userId } = req.params;
    try {
      const results = await db.users_groups.destroy({
        where: { crystalId, userId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error modifying group:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}];