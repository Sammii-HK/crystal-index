const db = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/images',
    handler: async (_, h) => {
      try {
        const results = await db.image.findAll({});
        return results;
      } catch (e) {
        console.log('error fetching users:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
];
