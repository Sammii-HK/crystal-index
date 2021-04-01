const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');


module.exports = [
  ...ping,
  ...users,
  ...crystals,
];