const mongoose = require('mongoose')

const PlayoffsSchema = new mongoose.Schema({
    ID: String,
    East: Number,
    West: Number,
    firstEast: [String],
    firstWest: [String],
    quarterEast: [String],
    quarterWest: [String],
    semiEast: [String],
    semiWest: [String],
    finalEast: [String],
    finalWest: [String],
    Champion: [String]
})

module.exports = mongoose.model('playoffs',PlayoffsSchema);