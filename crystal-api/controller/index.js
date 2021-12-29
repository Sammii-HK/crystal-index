const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');
const locations = require('./locations');
const favourites = require('./favourites');
const auth = require('./auth');
const images = require('./images');


module.exports = [
  ...ping,
  ...users,
  ...crystals,
  ...locations,
  ...favourites,
  ...auth,
  ...images,
];
