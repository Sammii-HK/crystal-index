const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/crystals/create',
  handler: async (req, h) => {
    const { 
      name, 
      bio, 
      image, 
      otherNames, 
      colour, 
      chakra, 
      createdBy, 
      origin,
      memento,
    } = req.payload;
    try {
      const results = await db.crystal.create({
        name,
        bio,
        image,
        otherNames,
        colour,
        chakra,
        createdBy,
        origin,
        memento,
        // locationDetails: {
        //   origin,
        //   memento,
        // },
        include: [
          {
            model: db.location,
            as: 'origin',
          },
          {
            model: db.location,
            as: 'memento',
          },
          // {
          //   model: db.crystalLocation,
          //   as: 'locationDetail',
          // },
        ],
      });
      return {
        success: true,
        id: results.id,
      };
    } catch (e) {
      console.log('error creating crystal:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/crystals',
  handler: async (_, h) => {
    try {
      const results = await db.crystal.findAll({
        // attributes: ['id', 'name'],
        include: [
          {
            model: db.location,
            as: 'origin',
          },
          {
            model: db.location,
            as: 'memento',
          },
          // {
          //   model: db.crystalLocation,
          //   as: 'locationDetail',
          // },
        ],
      });
      return results;
    } catch (e) {
      console.log('error creating crystal:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/crystals/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    try {
      const results = await db.crystal.findAll({
        where: { id: id },

        include: [
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
}, {
  method: 'PUT',
  path: '/crystals/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { 
      name, 
      bio, 
      image, 
      otherNames, 
      colour, 
      chakra,
      createdBy,
      origin, 
      memento, 
    } = req.payload;
    const results = await db.crystal.findAll({
      where: { id },
      include: [
        {
          model: db.location,
          as: 'origin',
        },
        {
          model: db.location,
          as: 'memento',
        }
      ],
    });
    try {
      const updatePromises = [];
      const updateCrystalsObject = await db.crystal.update({
        name,
        bio,
        image,
        otherNames,
        colour,
        chakra,
        createdBy,
        origin,
        memento,
      }, {
        where: { id },
      });
      updatePromises.push(updateCrystalsObject);

      await Promise.all(updatePromises);

      return results
    } catch (e) {
      console.log('error modifying crystal:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/crystals/{crystalId}',
  handler: async (req, h) => {
    const { crystalId } = req.params;
    try {
      const results = await db.crystal.destroy({
        where: { id: crystalId },
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
}, {
  method: 'DELETE',
  path: '/crystals/{crystalId}/{userId}',
  handler: async (req, h) => {
    const { crystalId, userId } = req.params;
    try {
      const results = await db.users_crystal.destroy({
        where: { crystalId, userId },
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
}];