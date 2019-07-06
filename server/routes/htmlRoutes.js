gitconst odds = require("./apiRoutes");
const db = require("../../server/database/models")
module.exports = function(app) {
    app.get("/", function (req, res){
        db.Game
        .findAll()
        .then(function(dbGame){
            res.render(upcomingGames)
        })
    })
}