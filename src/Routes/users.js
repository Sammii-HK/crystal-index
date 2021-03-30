const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/users',
  handler: async (req, h) => {
    const {
      userName, email, password, firstName, lastName, mobileNum, address,
    } = req.payload;
    try {
      const results = await db.users.create({
        userName, 
        email, 
        userDetails: {
          password,
          firstName, 
          lastName,
          mobileNum,
          address,
        },
        // favourites: {
        //   crystalId
        // }
      }, {
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        // }, {
        //   model: db.Favourites,
        //   as: 'favourites',
        //   through: db.Favourites,
        }],
      });
      return {
        success: true,
        id: results.id,
      };
    } catch (e) {
      console.log('error creating user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/users',
  handler: async (_, h) => {
    try {
      const results = await db.users.findAll({
        // attributes: ['id', 'userName'],
        // attributes: { exclude: ['password',] },
      }, {
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        }, 
        // {
        //   model: db.Favourites,
        //   as: 'favourites',
        // }
        ],
      });
      return results;
    } catch (e) {
      console.log('error fetching users:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/users/{userId}',
  handler: async (req, h) => {
    try {
      const { userId } = req.params;
      const results = await db.users.findAll({
        where: {
          id: userId,
        },
      });
      return results;
    } catch (e) {
      console.log('error finding user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/users/{userId}',
  handler: async (req, h) => {
    const { userId } = req.params;
    const {
      userName, password, firstName, lastName, mobileNum, address,
    } = req.payload;
    const updateUsersObject = {
      userName,
    };
    const updateUsersDetailsObject = {
      password, 
      firstName, 
      lastName,
      mobileNum,
      address,
    };
    const results = await db.users.findAll({
      where: {
        id: userId,
      },
    }, {
      include: [{
        model: db.userDetails,
        as: 'userDetails',
      }]
    });

    try {
      const updatePromises = [];
      const updateUsersPromise = db.users.update(
        updateUsersObject,
        { where: { id: userId } },
      );
      updatePromises.push(updateUsersPromise);

      const updateUserDetailsPromise = db.userDetails.update(
        updateUsersDetailsObject,
        { where: { userId } },
      );
      updatePromises.push(updateUserDetailsPromise);

      // const updatePostsPromises = posts.map((p) => {
      //   const { postTitle, postId } = p;
      //   const updateObject = {
      //     title: postTitle,
      //   };
      //   const whereQuery = {
      //     userId,
      //     id: postId,
      //   };
      //   return db.posts.update(
      //     updateObject,
      //     { where: whereQuery },
      //   );
      // });
      // updatePromises.push(...updatePostsPromises);

      await Promise.all(updatePromises);
      // return 'users records updated';
      return results
    } catch (e) {
      console.log('error updating user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'DELETE',
  path: '/users/{userId}',
  handler: async (req, h) => {
    try {
      const { userId } = req.params;
      const results = await db.users.destroy({
        where: {
          id: userId,
        },
      });
      return results;
    } catch (e) {
      console.log('error deleting user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}];