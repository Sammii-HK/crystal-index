const db = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/images',
    handler: async (_, h) => {
      try {
        const results = await db.image.findAll({
          attributes: ['id', 'crystalId'],
        });
        return results;
      } catch (e) {
        console.log('error fetching users:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'GET',
    path: '/images/{id}',
    handler: async (req, h) => {
      const { id } = req.params;
      try {
        const results = await db.image.findOne({
          where: { id },
        })
        return results
      } catch (e) {
        console.log('error fetching users:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
];
