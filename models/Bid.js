const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let BidSchema = new Schema({
    gameId: Number,
    gameOdds: Object,
    commencementTime: Number,
    teamOneBid: {
        type: Object,
        properties: {
            teamName: String,
            userId: Number,
            email: String,
            bidAmount: {
                type: Number,
                min: 1
            },
            gameId: Number
        },
    },
    teamTwoBid: {
        type: Object,
        properties: {
            teamName: String,
            userId: Number,
            email: String,
            bidAmount: {
                type: Number,
                min: 1
            },
            gameId: Number
        }
    }

});

const Bid = mongoose.model("Bid", BidSchema);
module.exports = Bid;