const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/locations',
  handler: async (req, h) => {
    const { 
      placeName, 
      country, 
      lat, 
      long, 
    } = req.payload;
    try {
      const results = await db.location.create({
        placeName, 
        country,
        lat,
        long, 
      });

      return results;

    } catch (e) {
      console.log('error creating location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/locations',
  handler: async (_, h) => {
    try {
      const results = await db.location.findAll({
        include: [
          {
            model: db.crystal,
            as: 'crystalsOfOrigin',
          }
        ],
      });

      return results;

    } catch (e) {
      console.log('error creating location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/locations/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    try {
      const results = await db.location.findAll({
        where: { id },
        include: [
          {
            model: db.crystal,
            as: 'crystalsOfOrigin',
          }
        ],
      });
      return results;
    } catch (e) {
      console.log('error creating location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/locations/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { 
      placeName, 
      country, 
      lat,
      long, 
    } = req.payload;
    const results = await db.location.findAll({
      where: { id },
    });
    try {
      const updatePromises = [];
      const updateLocationsObject = await db.location.update({
        placeName, 
        country,
        lat,
        long,
      }, {
        where: { id },
      });
      updatePromises.push(updateLocationsObject); 

      await Promise.all(updatePromises);

      return results
    } catch (e) {
      console.log('error modifying location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/locations/{crystalId}',
  handler: async (req, h) => {
    const { crystalId } = req.params;
    try {
      const results = await db.location.destroy({
        where: { id: crystalId },
      });
      return {
        success: true,
        results,
      };
    } catch (e) {
      console.log('error modifying location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/locations/{crystalId}/{userId}',
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
      console.log('error modifying location:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}];