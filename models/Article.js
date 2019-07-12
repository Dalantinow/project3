const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ArticleSchema = new Schema({
    title: {
        type: String
      
    },
    link: {
        type: String
        
    },
    thumbnail: {
        type: String
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;