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




export default defineEventHandler(async (event) => {
	await db()	


	const {userName, newName} = await readBody(event)
		const candidate = await UserModel.findOne({userName})
		if(candidate) return {err: 'name bus'}

		await UserModel.findOneAndUpdate({userName}, {userName: newName})
		return {
			message: "succcess"
		}

 
 })
 