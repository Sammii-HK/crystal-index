const ping = require('./ping');
const users = require('./users');
const crystals = require('./crystals');
const locations = require('./locations');
const favourites = require('./favourites');
const auth = require('./auth');


module.exports = [
  ...ping,
  ...users,
  ...crystals,
  ...locations,
  ...favourites,
  ...auth,
];

// export { default as ping } from './ping'
// export { default as crystals } from './crystals'
// export { default as locations } from './locations'
// export { default as favourites } from './favourites'