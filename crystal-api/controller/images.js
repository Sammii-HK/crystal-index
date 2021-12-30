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
    path: '/images/{id}',
    options: {
      auth: 'authUser',
    },
    handler: async (req, h) => {
      const { id } = req.params;
      const { crystalId } = req.payload;

      try {
        return await db.image.update({
          crystalId,
        }, 
        {
          where: { id },
          returning: true,
        })

      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    } 
  },
  {
    method: 'PUT',
    path: '/images/{id}/file/update',
    options: {
      auth: 'authUser',
      payload: {
        parse: true,
        output: 'data',
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 209715200,
      },
    },
    handler: async (req, h) => {
      const { image } = req.payload;
      const { file } = image;
      const { id } = req.params;

      try {
        const results = await db.image.update({
          file,
        }, 
        {
          where: { id },
        }, {
          include: {
            attributes: ['id', 'crystalId'],
          }
        })

        return results;

      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    } 
  }
];
