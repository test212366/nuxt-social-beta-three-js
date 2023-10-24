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

	const {id} = await readBody(event)


		const chat = await MessageModel.findOne({idMessages: id})
		
		return chat


 })