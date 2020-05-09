var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
	sender: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
	conversation_id: String,
	text:String,
	"isSeen" : false
}, { timestamps: true });

var Message = mongoose.model('Message', Message);

var Conversation = new Schema({
	user_id: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
	admin:{type: mongoose.Schema.Types.ObjectId,ref: "User"	},
	chat_type:String,
	group_users:[{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
	group_name:String,	
},{timestamps: true});

var Conversation = mongoose.model('Conversation', Conversation);

module.exports = {
	Message:Message,
	Conversation:Conversation
}