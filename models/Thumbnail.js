const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ThumbnailSchema = new Schema({
    url: {
        type: String
    }
});

const Thumbnail = mongoose.model("Thumbnail", ThumbnailSchema);
module.exports = Thumbnail;