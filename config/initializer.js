module.exports = (app,express) => {

	var flash = require('req-flash');
	var session = require('express-session');
	var cookieParser = require('cookie-parser');
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json());
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
	app.use(session({ secret: '123' }));
	app.use(flash({ locals: 'flash' }));
}