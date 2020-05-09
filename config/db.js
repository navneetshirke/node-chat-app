module.exports = (app,mongoose,port) =>{
	var url =  'mongodb://localhost:27017/protonshub'
	const pry = require('pry')
	var User = require('../models/user_model')
	
	const Conversation = require('../models/chat_model').Conversation
	const Message = require('../models/chat_model').Message

	mongoose.Promise = global.Promise;

	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => {
		console.log("Successfully connected to the database");    
	}).catch(err => {
		console.log('Could not connect to the database. Exiting now', err);
		process.exit();
	});



	var http = require('http').createServer(app);

	var io = require('socket.io')(http);	

	io.on('connection', function(socket){	

		room_id = socket.handshake.headers.referer.split('start_chating_single/')[1]

		console.log(room_id)

		socket.on(room_id, function(msg){

			if (req){
				const current_user = req.user || ""
			}
			else{
				const current_user = {
					"_id" : "5e7ba98e160f6a463b918821",
					"username" : "archit",
					"password" : "archit",
					"__v" : 0
				}	
			}
			
			message = new Message({
				sender:current_user._id,
				conversation_id:room_id,
				text:msg
			})

			message.save()

			io.emit(room_id, msg)
		});
	})


	http.listen(3000, function(){
		console.log('listening on *:3000');
	});

}
