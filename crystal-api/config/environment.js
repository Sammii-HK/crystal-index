require('dotenv').config();

const secret = process.env.SECRET
const port = process.env.PORT || 3000
const tokenExpiry = 14400 // 4 hours

module.exports = { secret, port, tokenExpiry }
