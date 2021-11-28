const db = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: async (_, h) => {
      try {
        const results = await db.user.findAll({
          // attributes: ['id', 'username'],
          // attributes: { exclude: ['password',] },
          include: [
            {
              model: db.userDetail,
              as: 'userDetail',
              attributes: ['firstName'],
            }, 
            {
              model: db.crystal,
              as: 'createdCrystals',
              attributes: ['name'],
              
            },
            {
              model: db.crystal,
              as: 'favouriteCrystals',
              attributes: ['name'],
              through: {
                model: db.favourite,
              },
            },
          ],
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
    path: '/users/{id}',
    handler: async (req, h) => {
      try {
        const { id } = req.params;
        const results = await db.user.findAll({
          where: { id },
          include: [
            {
              model: db.userDetail,
              as: 'userDetail',
              attributes: ['firstName'],
            }, {
              model: db.crystal,
              as: 'createdCrystals',
            },
            {
              model: db.crystal,
              as: 'favouriteCrystals',
              through: {
                model: db.favourite,
              },
            },
          ],
        });
        return results;
      } catch (e) {
        console.log('error finding user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
];
