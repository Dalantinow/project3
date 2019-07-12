const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./models');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const cheerio = require("cheerio");
require('dotenv').config()
const axios = require("axios");
const Article = require("./models/Article")

// Route requires

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
const user = require('./routes/user')
// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())


// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Scraping
app.get("/scrape", (req, res) => {
	axios.get("https://old.reddit.com/r/sports").then(response => {

		let $ = cheerio.load(response.data);
		let results = {};
		for (var i = 0; i < $.length; i++) {


			$("p.title").each(function (i, element) {
				results.title = $(this).children("a").text();
				results.link = $(this).children("a").attr("href");
				// console.log(dbConnection.Article)
				// dbConnection.Article.findOne({title: results.title, link: results.link}, function (err, data) {
				// 	if(err) {
				// 		console.log(err)
				// 	} else {
				// 		if (data === null) {
				// 			dbConnection.Article.create(result)
				// 			.then(dbArticle => console.log(dbArticle))
				// 			.catch(err => console.log(err))
				// 		}
				// 	}
				// })

				const newArticle = new Article({
					title: results.title,
					link: results.link
				})

				newArticle.save((err, savedArticle) => {
					if (err) return res.json(err)
					res.json(savedArticle)
				})
			});
		}
	});
});


// Routes
app.use('/user', user)

app.get("/articles", (req, res) => {
	dbConnection.Article.find().then(dbArticle =>
		res.json(dbArticle))
	console.log(dbArticle)
		.catch(err => res.json(err));
});

app.get("/game/:id", (req, res) => {
	dbConnection.Game.find().then(dbGame => res.json(dbGame))
		.catch(err => res.json(err))
})

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
