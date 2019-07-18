const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./models');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const Article = require("./models/Article");
const Bid = require("./models/Bid")
const path = require("path");


// Route requires

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors());
const user = require('./routes/user')

// MIDDLEWARE

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json())
app.use(session({
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
		Article.deleteMany()
			.then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
			.catch(err => console.error(`Delete failed with error: ${err}`))
		let $ = cheerio.load(response.data);
		let results = {};
		for (var i = 0; i < 1; i++) {
			$("div.thing").each(function (i, element) {
				results.title = $(this).children("div.entry").children("div.top-matter").children("p.title").children("a").text();
				results.link = $(this).children("div.entry").children("div.top-matter").children("p.title").children("a").attr("href");
				results.thumbnail = $(this).children("a.thumbnail").children("img").attr("src");
				const newArticle = new Article({
					title: results.title,
					link: results.link,
					thumbnail: results.thumbnail
				});
				newArticle.save((err, savedArticle) => {
					if (err) return res.json(err)
				});
			});
		};
		Article.find().then(articles => {
			res.json(articles)
		});
	});
});
// Routes
app.use('/user', user);

app.get("/articles", (req, res) => {
	Article.find().then(dbArticle =>
		res.json(dbArticle))
		.catch(err => res.json(err));
});

app.get("/bid", function (req, res) {
	Bid.find((err, data) => {
		if (err) {
			console.log(err);
		} else {
			res.json(data)
		};
	});
});

app.post("/bid", function (req, res) {
	const newBid = new Bid({
		teamOneName: req.body.home,
		teamOneNumber: 1,
		teamTwoName: req.body.away,
		teamTwoNumber: 2,
		commencementTime: req.body.time
	});
	newBid.save((err, savedBid) => {
		if (err) return res.json(err);
		return res.json(savedBid)
	});
	

});

app.get("/bid/:id", (req, res) => {
	console.log(req.body)
	Bid.findOne({_id: req.params.id}).then(function (data) {
		res.json(data);
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});
