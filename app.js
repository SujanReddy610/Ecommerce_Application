// App.js

var express = require("express")
	//mongoose = require("mongoose")
    const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/student-reg').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected`);
}); 
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose")
const User = require("C:\\Users\\Shirisha Reddy\\OneDrive\\Documents\\Desktop\\rf4\\model\\user.js");
var app = express();

//mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password,
	comment: req.body.comment
	})
	
	return res.status(200).json(user);
});
/*app.post("/register", function(req, res){
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
      });
      newUser.save(function(err){
        if (err) {
          console.log(err);
        } else {
          res.render("secrets");
       }
     });
    });*/

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
	
	const username= req.body.username;
	const password=req.body.password;
	if (username.length>0 && password.length>0)
	{
	
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render("secret");
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
}
else{
	res.status(400).json({ error: "enter username and password" });
}
});



//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
} 


var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});








function newFunction() {
	return new pusher({
		appid: process.env.pusher_app_id,
		key: process.env.pusher_key,
		secret: process.env.pusher_secret,
		cluster: process.env.pusher_cluster,
		usetls: true,
	});
}

