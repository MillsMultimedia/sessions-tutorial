var express = require('express');
var router = express.Router();

/* redirect to login page */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('login');
});

/* GET user-login route. */
router.get('/user-login', function(req, res, next) {
	res.redirect('/login');
});

router.get('/user-landing', function(req, res, next) {
	res.render('user-landing', {firstname: 'testing'});
});

/* GET user-login route. */
router.get('/user-info', function(req, res, next) {
	res.render('user-info', {firstname: 'testing'});
});

/* GET user-login route. */
router.get('/logout', function(req, res, next) {
	res.redirect('/login');
});

module.exports = router;
