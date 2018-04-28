var express = require('express');
var router = express.Router();
var session = require('express-session');

//users list (normally this would be in your database and a service class)
var userList=[{_id:1,firstName:'Steve',lastName:'Rogers',email:'captainamerica@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'},{_id:2,firstName:'Tony',lastName:'Stark',email:'ironman@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'},{_id:3,firstName:'Natasha',lastName:'Romanova',email:'blackwidow@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'},{_id:4,firstName:'Bruce',lastName:'Banner',email:'thehulk@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'},{_id:5,firstName:'Clint',lastName:'Barton',email:'hawkeye@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'},{_id:6,firstName:'Thor',lastName:'Odinson',email:'thor@avengers.com',website:'http://www.millsmultimedia.net',password:'password',accountLevel:'user'}];

/* redirect to login page */
router.get('/', function(req, res, next) {
  res.send(req.session.id);
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('login');
});



/* GET user-login route. */
router.get('/user-login', function(req, res, next) {
	//if the user is already logged in
	if (req.session.user)
		res.redirect('/user-landing/' + req.session.user._id)
	else {
		//see if user exists
		var loggedInUser = userList.find( user => user.email == req.param('username') );

		//see if the password matches the user
		if (loggedInUser != undefined && loggedInUser.password == req.param('password') ) {
			//add the user as a session variable
			req.session.user = loggedInUser;

			//then redirect to the user's landing page
			res.redirect('/user-landing/' + req.session.user._id)
		}
		else {

			res.render('login', {wrongLogin: true});
		}
	}
});



router.get('/user-landing/:userid', function(req, res, next) {
	if (req.session.user && req.session.user._id == req.params.userid)
		res.render('user-landing', {user: req.session.user});
	else
		res.render('login', {loginrequired: true});
});

/* GET user-login route. */
router.get('/user-info/:userid', function(req, res, next) {
	if (req.session.user && req.session.user._id == req.params.userid)
		res.render('user-info', {user: req.session.user});
	else
		res.render('login', {loginrequired: true});
});

/* GET user-login route. */
router.get('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/login');
});

module.exports = router;
