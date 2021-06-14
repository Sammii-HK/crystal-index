
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

export default hashPassword;

// export default function hashPassword(password, cb) {
//   const saltRounds = 10;

//   bcrypt.hash(password, saltRounds, function(err, hash) {
//     // Store hash in database here
//     // In the above example, we simply console.log the hash. 
//     // In real life, there would probably be a function there to insert the hash into a database.
//   });
// }