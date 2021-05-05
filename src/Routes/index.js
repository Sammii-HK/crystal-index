const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');
const locations = require('./locations');
const favourites = require('./favourites');


module.exports = [
  ...ping,
  ...users,
  ...crystals,
  ...locations,
  ...favourites,
];