module.exports = [{
  method: 'GET',
  path: '/ping',
  handler: () => 'pong',
}, {
  method: 'GET',
  path: '/hello',
  handler: async () => 'Hello World! 🍭',
} ];