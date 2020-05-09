	const pry = require('pry')

	module.exports = (app,mongoose,dbConfig) => {

		const User = require('../models/user_model');
		var passport = require('passport')
		var LocalStrategy = require('passport-local').Strategy;
		var flash = require('req-flash');	
		app.use(flash());
		app.use(passport.initialize())
		app.use(passport.session())


		passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.findOne({ username: username }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			});
		}
		));

		passport.serializeUser(function(user, done) {
			done(null, user);
		});

		passport.deserializeUser(function(user, done) {
			done(null, user);
		});

		app.post('/login',
			passport.authenticate('local', { 
				successRedirect: '/chat',
				failureRedirect: '/fail',
				failureFlash: true
			})
			);

	// app.get('/logout', (req,res)=>{
	// 	req.logOut() 
	// 	res.clearCookie('connect.sid');
	// 	res.render('/')
	// })

	require('../config/route.js')(app, passport);


}