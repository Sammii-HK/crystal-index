const db = require('../models');

module.exports = [
  {
  method: 'POST',
  path: '/crystals/create',
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
    const { crystal, image } = req.payload;
    try {
      const { 
        name, bio, otherNames, colour, chakra, userId, originId, mementoId,
      } = JSON.parse(crystal);

      const results = await db.crystal.create({
        name,
        bio,
        otherNames,
        colour,
        chakra,
        userId,
        originId,
        mementoId,
        image: {
          type: 'image/jpeg', 
          file: image,
        },
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
            model: db.image,
            as: 'image',
            attributes: ['id'],
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
              attributes: ['id', 'username'],
              through: {
                model: db.favourite,
              },
            },
            {
              model: db.image,
              as: 'image',
              attributes: ['id'],
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
        const results = await db.crystal.findOne({
          where: { id },
          // attributes: { exclude: [ 'originId', 'mementoId', 'userId' ] },
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
            {
              model: db.image,
              as: 'image',
              attributes: ['id'],
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
      const { crystal, image } = req.payload;
      const { id } = req.params;

      try {
        const { 
          name, bio, otherNames, colour, chakra, userId, originId, mementoId,
        } = JSON.parse(crystal);

        if (image) {
          await db.image.update({
            crystalId: null,
          }, {
            where: { crystalId: id },
          });
  
          await db.image.create({
            type: 'image/jpeg', 
            file: image,
            crystalId: id,
          });
        }

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
              attributes: ['id', 'username'],
              through: {
                model: db.favourite,
              },
            },
            {
              model: db.image,
              as: 'image',
              attributes: ['id'],
            },
          ],

        });

        await Promise.all(updateCrystalsObject);

        const results = await db.crystal.findAll(
          { where: { id } },
          {
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
          },
        );

        return results
        
      } catch (e) {
        console.log('error modifying crystal:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  // {
  //   method: 'DELETE',
  //   path: '/crystals/{crystalId}',
  //   options: {
  //     auth: 'authUser',
  //   },
  //   handler: async (req, h) => {
  //     const { crystalId } = req.params;
  //     try {
  //       const results = await db.crystal.destroy({
  //         where: { id },
  //       });
  //       return {
  //         success: true,
  //         results,
  //       };
  //     } catch (e) {
  //       console.log('error modifying crystal:', e);
  //       return h.response(`Failed: ${e.message}`).code(500);
  //     }
  //   },
  // }, 
  
];