var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: String,
	password: String
});

User.methods.validPassword = function( pwd ) {
	return ( this.password === pwd );
};

module.exports = mongoose.model('User', User);