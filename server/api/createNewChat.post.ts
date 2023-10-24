import db from '../db'
import UserModel from '../models/userModel'
import MessageModel from '../models/messagesModel'

import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken'



const getDate = () => {
	const date = new Date()
	return ` ${date.getHours()}:${date.getMinutes()}`
}

export default defineEventHandler(async (event) => {
	await db()	


	const { message} = await readBody(event)

		const userFrom = await UserModel.findOne({userName: message.from})
		const userTo = await UserModel.findOne({userName: message.to})
		
		const createId = uuidv4()
		// chat.idMessages = createId
		await MessageModel.create({
			idMessages: createId,
			messages: []
		})

		//@ts-ignore
		await UserModel.findOneAndUpdate({userName: message.from}, {chats: [...userFrom.chats, {
			userName: message.to,
			time: message.time,
			lastMessage: message.payload,
			idMessages: createId
		}]})
		//@ts-ignore
		await UserModel.findOneAndUpdate({userName: message.to}, {chats: [...userTo.chats, {
			userName: message.from,
			time: message.time,
			lastMessage: message.payload,
			idMessages: createId
		}]})

	
	


			return createId

 
 })
 