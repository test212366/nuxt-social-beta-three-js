import db from '../db'
import UserModel from '../models/userModel'
import MessageModel from '../models/messagesModel'

// import mailSend from '../utils/SendMail'
import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

const getDate = () => {
	const date = new Date()
	let min:any = date.getMinutes()

	if(min < 10) min = `0${min}`
	// console.log(date.getMonth(), date.getDay())

	

	return `${date.getHours()}:${min}`
	// return ` ${date.getHours()}:${date.getMinutes()}`
}


export default defineEventHandler(async (event) => {
	await db()	

	const {id, userName} = await readBody(event)

	if(id === null) {
		const user = await UserModel.findOne({userName})
		let newDialog = null
		//@ts-ignore
		const newChats = await Promise.all(user.chats.map( async (chat: any) => {
			if(chat.userName === 'BOT_S') {
				const createId = uuidv4()
				chat.idMessages = createId
				newDialog = await MessageModel.create({
					idMessages: createId,
					messages: [
						{
							payload: chat.lastMessage,
							time: getDate(),
							from: chat.userName
						}
					]
				})
				return chat
			}
		})) 
		// console.log(newChats)
		// user!.chats = newChats
	
		// await user!.save()
			//@ts-ignore
			// console.log(user) 
		//@ts-ignore
		await UserModel.findOneAndUpdate({userName}, {chats: newChats})

		if(newDialog) {
			return newDialog
		} 
	} else {
		const chat = await MessageModel.findOne({idMessages: id})
		
		return chat
	}

 })