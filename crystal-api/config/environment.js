const secret = process.env.SECRET || 'Zge{T*g._&;(gCaQ2mcn=-mR'
// const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/on-set-london'
const port = process.env.PORT || 3000
const tokenExpiry = 14400 // 4 hours

module.exports = { secret, port, tokenExpiry }
