const User = require('../models/user_model')
const Conversation = require('../models/chat_model').Conversation
const Message = require('../models/chat_model').Message

// const current_user = {
// 	"_id" : "5e7ba98e160f6a463b918821",
// 	"username" : "archit",
// 	"password" : "archit",
// 	"__v" : 0
// }
// //5e8a6b4e123b4569d70e62ec
const pry = require('pry')

module.exports = {

	index: async (req,res) => {
		const current_user = req.user
		users = await User.find()
		conversations = await Conversation.find({ admin: current_user._id , chat_type:"SINGLE"}).populate("user_id")
		groups = await Conversation.find({ admin: current_user._id, chat_type:"GROUP" }).populate("group_users")
		res.render('chat',{
			hide: "sidebaroff",
			user: "users" ,
			users:users.filter((item) => item.id !== current_user._id),
			current_user: current_user || "",
			conversations: conversations || "",
			room_id: req.params.id || "",
			groups: groups,
			msgs:  []
		})
	},

	new_chat: async (req,res)=>{
		const current_user = req.user
		conversation = await Conversation.find({ user_id: req.params.id , chat_type:"SINGLE"})
		if (conversation.length == 0){
			const conversation = new Conversation({ admin: current_user._id, user_id:req.params.id , chat_type:"SINGLE"})
			conversation.save()
			res.redirect('/start_chating_single/'+conversation._id)				
		}
		else{
			res.redirect('/start_chating_single/'+conversation[0]._id)
		}	
	},

	start_chating_single: async (req,res) => { 
		const current_user = req.user
		users = await User.find()
		groups = await Conversation.find({ admin: current_user._id, chat_type:"GROUP" }).populate("group_users")
		conversations = await Conversation.find({ admin: current_user._id, chat_type:"SINGLE"  }).populate("user_id")
		msgs = await Message.find({conversation_id: req.params.id}).populate("sender")
		res.render('chat',{
			hide: "sidebaroff",
			user: "users" ,
			users:users.filter((item) => item.id !== current_user._id),
			current_user: current_user,
			msgs:msgs,
			room_id:req.params.id,
			conversations:conversations,
			groups:groups,
		})
	},


	new_chat_group: (req,res)=>{
		const current_user = req.user
		const conversation = new Conversation({
			group_users: req.body.user_ids, 
			chat_type:"GROUP",
			group_name:req.body.name,
			admin: current_user._id,
		})
		conversation.save()
		res.send(conversation._id)
	},

	start_chating_group: async (req,res)=>{
		const current_user = req.user
		users = await User.find()
		groups = await Conversation.find({ admin: current_user._id, chat_type:"GROUP" }).populate("group_users")
		conversations = await Conversation.find({ admin: current_user._id, chat_type:"SINGLE"  }).populate("user_id")
		msgs = await Message.find({conversation_id: req.params.id}).populate("sender")
		res.render('chat',{
			hide: "sidebaroff",
			user: "users" ,
			users:users.filter((item) => item.id !== current_user._id),
			current_user: current_user,
			msgs:msgs,
			room_id:req.params.id,
			conversations:conversations,
			groups:groups,
		})

	}

}


//https://www.quora.com/What-is-the-technology-behind-the-blue-tick-in-WhatsApp
