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
        include: [{
          model: db.userDetails,
          as: 'userDetails',
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
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        }],
      });
      return results;
    } catch (e) {
      console.log('error fetching users:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/users/{id}',
  handler: async (req, h) => {
    try {
      const { id } = req.params;
      const results = await db.users.findAll({
        where: { id },
        include: [{
          model: db.userDetails,
          as: 'userDetails',
        }],
      });
      return results;
    } catch (e) {
      console.log('error finding user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'GET',
  path: '/users/{id}/user-details',
  handler: async (req, h) => {
    try {
      const { id } = req.params;
      const results = await db.userDetails.findAll({
        where: { id },
      });
      return results;
    } catch (e) {
      console.log('error finding user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/users/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
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
      where: { id },
      include: [{
        model: db.userDetails,
        as: 'userDetails',
      }],
    });

    try {
      const updatePromises = [];
      const updateUsersPromise = db.users.update(
        updateUsersObject,
        { where: { id } },
      );
      updatePromises.push(updateUsersPromise);

      const updateUserDetailsPromise = db.userDetails.update(
        updateUsersDetailsObject,
        { where: { id } },
      );
      updatePromises.push(updateUserDetailsPromise); 

      await Promise.all(updatePromises);
      // return 'users records updated';
      return results
    } catch (e) {
      console.log('error updating user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}, {
  method: 'PUT',
  path: '/users/{id}/user-details',
  handler: async (req, h) => {
    const { id } = req.params;
    const {
      password, firstName, lastName, mobileNum, address,
    } = req.payload;
    const updateUsersDetailsObject = {
      password, 
      firstName, 
      lastName,
      mobileNum,
      address,
    };
    const results = await db.userDetails.findAll({
      where: { id },
    });

    try {
      const updatePromises = [];

      const updateUserDetailsPromise = db.userDetails.update(
        updateUsersDetailsObject,
        { where: { id } },
      );
      updatePromises.push(updateUserDetailsPromise);   

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
  path: '/users/{id}',
  handler: async (req, h) => {
    try {
      const { id } = req.params;
      const results = await db.users.destroy({
        where: {
          id: id,
        },
      });
      return results;
    } catch (e) {
      console.log('error deleting user:', e);
      return h.response('Failed:', e.message).code(500);
    }
  },
}];

// const updatePostsPromises = posts.map((p) => {
      //   const { postTitle, postId } = p;
      //   const updateObject = {
      //     title: postTitle,
      //   };
      //   const whereQuery = {
      //     id,
      //     id: postId,
      //   };
      //   return db.posts.update(
      //     updateObject,
      //     { where: whereQuery },
      //   );
      // });
      // updatePromises.push(...updatePostsPromises);