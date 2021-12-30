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
        });
        const image = results.dataValues.file

        return h.response(image)
          .header('Content-Disposition','inline')
          .header('Content-type', results.dataValues.type)
          .header('Cache-Control', 'max-age=3600000000000000000');
      } catch (e) {
        console.log('error fetching users:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'PUT',
    path: '/images/{id}/{crystalId}',
    options: {
      auth: 'authUser',
    },
    handler: async (req, h) => {
      const { id, crystalId } = req.params;

      try {
        await db.image.update({
          crystalId,
        }, 
        {
          where: { id },
        }, {
          include: {
            attributes: ['id', 'crystalId'],
          }
        })

        const results = await db.image.findOne({
          where: { id },
          include: {
            attributes: ['id', 'crystalId', ],
          },
        })

        return results;

      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    } 
  },
];
