import db from '../db'
import UserModel from '../models/userModel'
// import mailSend from '../utils/SendMail'
import tokenService from '../utils/Token'
import MessageModel from '../models/messagesModel'

import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';


const getDate = () => {
	const date = new Date()
	const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const dayofWeek = date.getDay()
	let min:any = date.getMinutes()

	if(min < 10) min = `0${min}`
	// console.log(date.getMonth(), date.getDay())

	const dayOfWeek = week[dayofWeek];

	return `${dayOfWeek}, ${date.getHours()}:${min}`
}

export default defineEventHandler(async (event) => {
	// //@ts-ignore
	// const {req} = event
	// //@ts-ignore
	// const currentURL = process.server ? req.headers.host + req.url : window.location.href;
   //  console.log('Current URL:', currentURL);
	await db()	

	const {id, message} = await readBody(event)
	//@ts-ignore
	// console.log(data)
	const mess = await MessageModel.findOne({idMessages: id})

	//@ts-ignore
	const test = await MessageModel.findOneAndUpdate({idMessages: id}, {messages: [...mess.messages, message] } )


	const updateChats = (user: any, chatUser:string) => {
		const newChats = user.chats.filter((chat: any) => chat.userName !== chatUser)
		return [{userName: chatUser, time: getDate(), lastMessage: message.payload, idMessages: id}, ...newChats ]
		 
	}
	if(message.to !== 'BOT_S') {
		const userTo = await UserModel.findOne({userName: message.to})
		console.log(userTo)
		
		const chats = updateChats(userTo, message.from)
		console.log(chats)
		await UserModel.findOneAndUpdate({userName: message.to}, {chats})
	}
	
	if(message.from !== 'BOT_S') {
		const userFrom = await UserModel.findOne({userName: message.from})
		// console.log(userFrom)

		const chats = updateChats(userFrom, message.to)
		await UserModel.findOneAndUpdate({userName: message.from}, {chats})
	
		return chats
	}
	console.log(message)
 
	
 
	

 	   
   return {
		result: 'success'
	}
 })