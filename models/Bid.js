const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let BidSchema = new Schema({
    gameOdds: Object,
    commencementTime: Number,
    teamOneBidAmount: {
        type: Number,
        min: 1
    },
    teamOneName: String,
    teamOneId: Number,
    teamOneBettorId: Number,
    teamTwoBidAmount: {
        type: Number,
        min: 1
    },
    teamTwoName: String,
    teamTwoId: Number,
    teamTwoBettorId: Number,
    betPlaced: Boolean,
    betConfirmed: Boolean
});

const Bid = mongoose.model("Bid", BidSchema);
module.exports = Bid;