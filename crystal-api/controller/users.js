const db = require('../models');

module.exports = [
  {
  method: 'POST',
  path: '/users',
  handler: async (req, h) => {
    const {
      username, email, password, firstName, lastName, mobileNum, address,
    } = req.payload;
    try {
      const results = await db.user.create({
        username, 
        email, 
        password,
        userDetail: {
          firstName, 
          lastName,
          mobileNum,
          address,
        }
      }, {
        include: [
          {
            model: db.userDetail,
            as: 'userDetail',
          },
        ],
      });

        return {
          success: true,
          id: results.id,
        };
      } catch (e) {
        console.log('error creating user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
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
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: async (req, h) => {
      const { id } = req.params;
      const {
        username, password, firstName, lastName, mobileNum, address,
      } = req.payload;

      const updateUsersObject = {
        username,
        password, 
      };

      const updateUserDetailsObject = {
        firstName, 
        lastName,
        mobileNum,
        address,
      };

      try {
        const updatePromises = [];
        const updateUsersPromise = db.user.update(
          updateUsersObject,
          { where: { id } },
        );
        updatePromises.push(updateUsersPromise);

        const updateUserDetailsPromise = db.userDetail.update(
          updateUserDetailsObject,
          { where: { id } },
        );
        updatePromises.push(updateUserDetailsPromise); 

        await Promise.all(updatePromises);


        const results = await db.user.findAll({
          where: { id },
          include: [
            {
              model: db.userDetail,
              as: 'userDetail',
            },
          ],
        });

        return results

      } catch (e) {
        console.log('error updating user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: async (req, h) => {
      try {
        const { id } = req.params;
        const results = await db.user.destroy({
          where: {
            id: id,
          },
        });
        return results;
      } catch (e) {
        console.log('error deleting user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }
];
