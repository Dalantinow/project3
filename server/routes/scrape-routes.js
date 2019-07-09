const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

module.exports = function (app) {

  // GET route to scrape website
  app.get("/scrape", function (req, res) {
    // Remove previous articles before scrape
    db.Article.deleteMany()
      .then(console.log('remove all'));

    // Website to scrape
    axios.get("").then(function (response) {
      // Load website into cheerio
      const $ = cheerio.load(response.data)

      $("article").each(function (i, element) {
        const result = {};
        // Add data to results object
        result.headline = $(this).find("h2").text();
        result.summary = $(this).find("li").text();
        result.link = $(this).find("a").attr("href");

        // Create a new Article
        db.Article.create(result)
          .then(function (dbArticle) {
            console.log('dbArticle', dbArticle)
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      // Send confirmation message
      res.redirect("/")
      console.log("Scrape Complete");

    });
  });

  // GET route for getting all Articles from the MongoDB
  app.get("/articles", function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // GET route for getting individual Article
  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({
      _id: req.params.id
    })
      .then(function (dbArticle) {
        console.log("individual article", dbArticle)
        res.json(dbArticle)
      })
  })
};
