module.exports = (app) => {

	const User = require('../controllers/user_controller')

	const Auth = require('../controllers/auth_controller')

	const Chat = require('../controllers/chat_controller')
	
	app.get('/', User.index)

	app.get('/chat',  Auth.ensureAuthenticated,   Chat.index)

	app.get('/start_chating_single/:id',  Auth.ensureAuthenticated,  Chat.start_chating_single)
	
	app.post('/new_chat_group',  Auth.ensureAuthenticated,  Chat.new_chat_group)

	app.get('/start_chating_group/:id',  Auth.ensureAuthenticated,  Chat.start_chating_group)

	app.get('/new_chat/:id',  Auth.ensureAuthenticated,  Chat.new_chat)

}
