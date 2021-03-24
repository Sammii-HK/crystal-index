const db = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/users',
  handler: async (req, h) => {
    const {
      userName, email, password, firstName, lastName, mobileNum, address,
    } = req.payload;
    try {
      const results = await db.user.create({
        userName, 
        email, 
        password,
        userDetails: {
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
      const results = await db.user.findAll({
        // attributes: ['id', 'userName'],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
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
      console.log('error fetching user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/users/{userId}',
  handler: async (req, h) => {
    const { userId } = req.params;
    const {
      firstName, lastName, mobileNum, address,
    } = req.payload;
    const updateUsersObject = {
      userName,
    };
    const updateUsersDetailsObject = {
      firstName, 
      lastName,
      mobileNum,
      address,
    };

    try {
      const updatePromises = [];
      const updateUsersPromise = db.user.update(
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
      return 'user records updates';
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
      const results = await db.user.destroy({
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