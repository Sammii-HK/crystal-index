const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/crystals/create',
  handler: async (req, h) => {
    const { 
      name, bio, image, otherNames, colour, chakra, createdBy
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
        include: [{
          model: db.users,
          as: 'createdBy',
        }],
        
      });
      return {
        success: true,
        id: results.id,
      };
      return results;
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

        // include: [{
        //   model: db.user,
        //   as: 'createdBy',
        // }],

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
      name, bio, image, otherNames, colour, chakra,
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
      }, {
        where: { id },
      });

      await Promise.all(updateCrystalsObject);

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