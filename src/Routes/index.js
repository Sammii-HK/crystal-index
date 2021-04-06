const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');
const locations = require('./locations');


module.exports = [
  ...ping,
  ...users,
  ...crystals,
  ...locations,
];