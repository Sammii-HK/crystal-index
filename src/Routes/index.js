const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');
const favourites = require('./favourites');

module.exports = [
  ...ping,
  ...users,
  ...crystals,
  ...favourites,
];