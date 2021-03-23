const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/crystals/create',
  handler: async (req, h) => {
    const { crystalName } = req.payload;
    try {
      await db.Crystal.create({
        crystalName,
      });
      return 'ok';
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
      const results = await db.Crystal.findAll({
        attributes: ['id', 'name'],
      });
      return results;
    } catch (e) {
      console.log('error creating crystal:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/crystals/{crystalId}',
  handler: async (req, h) => {
    const { crystalId } = req.params;
    try {
      const results = await db.Crystal.findAll({
        where: { id: crystalId },
        attributes: ['id', 'crystalName'],
        include: {
          model: db.users,
          as: 'users',
          attributes: ['id', 'userName', 'name'],
        },
      });
      return results;
    } catch (e) {
      console.log('error creating crystal:', e);
      return h.response(`Failed: ${e.message}`).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/crystals/{crystalId}',
  handler: async (req, h) => {
    const { crystalId } = req.params;
    const { crystalName } = req.payload;
    try {
      const noOfRecordsUpdated = await db.Crystal.update({
        crystalName,
      }, {
        where: { id: crystalId },
      });
      return {
        success: true,
        results: noOfRecordsUpdated,
      };
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
      const results = await db.Crystal.destroy({
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
      const results = await db.users_crystals.destroy({
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