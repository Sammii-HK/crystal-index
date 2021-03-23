module.exports = [{
  method: 'GET',
  path: '/ping',
  handler: () => 'pong',
}, {
  method: 'GET',
  path: '/',
  handler: async () => 'Hello World! 🍭',
} ];