const db = require('../models');

module.exports = [
  {
  method: 'POST',
  path: '/crystals/create',
  handler: async (req, h) => {
    const { 
        name, bio, image, otherNames, colour, chakra, userId, originId, mementoId,
    } = req.payload;
    try {
      const results = await db.crystal.create({
        name,
        bio,
        image,
        otherNames,
        colour,
        chakra,
        userId,
        originId,
        mementoId,
      }, {
        include: [
        {
          model: db.user,
          as: 'createdBy',
          attributes: ['id', 'username'],
        },
        {
          model: db.location,
          as: 'origin',
        },
        {
          model: db.location,
          as: 'memento',
        },
      ],

      });

      return results;

      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'GET',
    path: '/crystals',
    handler: async (_, h) => {
      try {
        const results = await db.crystal.findAll({
          include: [
            {
              model: db.user,
              as: 'createdBy',
              attributes: ['id', 'username'],
            }, 
            {
              model: db.location,
              as: 'origin',
            },
            {
              model: db.location,
              as: 'memento',
            },
            {
              model: db.user,
              as: 'favouritedBy',
              through: {
                model: db.favourite,
              },
            },
          ],

        });
        return results;
      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'GET',
    path: '/crystals/{id}',
    handler: async (req, h) => {
      const { id } = req.params;
      try {
        const results = await db.crystal.findAll({
          where: { id },
          attributes: { exclude: [ 'originId', 'mementoId', 'userId' ] },
          include: [
            {
              model: db.user,
              as: 'createdBy',
              attributes: ['id', 'username'],
            }, 
            {
              model: db.location,
              as: 'origin',
            },
            {
              model: db.location,
              as: 'memento',
            },
            {
              model: db.user,
              as: 'favouritedBy',
              attributes: ['id', 'username'],
              through: {
                model: db.favourite,
              },
            },
          ],
        });
        return results;
      } catch (e) {
        console.log('error creating crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'PUT',
    path: '/crystals/{id}',
    handler: async (req, h) => {
      const { id } = req.params;
      const { 
        name, bio, image, otherNames, colour, chakra, userId, originId, mementoId, favouritedBy,
      } = req.payload;
      const results = await db.crystal.findAll({
        where: { id },
      });
      try {
        const updateCrystalsObject = await db.crystal.update({
          name,
          bio,
          image,
          otherNames,
          colour,
          chakra,
          userId,
          originId,
          mementoId,
        }, {
          where: { id },
        }, {
          include: [
            {
              model: db.user,
              as: 'createdBy',
              attributes: ['id', 'username'],
            },
            {
              model: db.location,
              as: 'origin',
            },
            {
              model: db.location,
              as: 'memento',
            },
            {
              model: db.user,
              as: 'favouritedBy',
              through: {
                model: db.favourite,
              },
            },
          ],

        });

        await Promise.all(updateCrystalsObject);

        return results
        
      } catch (e) {
        console.log('error modifying crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'DELETE',
    path: '/crystals/{crystalId}',
    handler: async (req, h) => {
      const { crystalId } = req.params;
      try {
        const results = await db.crystal.destroy({
          where: { id },
        });
        return {
          success: true,
          results,
        };
      } catch (e) {
        console.log('error modifying crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  
];