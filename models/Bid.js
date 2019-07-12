const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let BidSchema = new Schema({
    teamOne: {
        type: Object,
        required: ["teamName", "userId", "bidAmount", "gameId"],
        properties: {
            teamName: String,
            userId: Number,
            bidAmount: {
                type: Number,
                min: 1
            },
            gameId: Number
        },
    },
    teamTwo: {
        type: Object,
        required: ["teamName", "userId", "bidAmount", "gameId"],
        properties: {
            teamName: String,
            userId: Number,
            bidAmount: {
                type: Number,
                min: 1
            },
            gameId: Number
        }
    }

});

const Bid = mongoose.model("Bid", ArticleSchema);
module.exports = Bid;