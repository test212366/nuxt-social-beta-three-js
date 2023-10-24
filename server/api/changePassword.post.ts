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


	const {userName, passwordOld, passwordNew} = await readBody(event)
	
	const user = await UserModel.findOne({userName})



	//@ts-ignore
   const comparePassword = bcrypt.compareSync(passwordOld, user.password)
	if(!comparePassword) return {err: 'password n equal'}
	await UserModel.findOneAndUpdate({userName}, {password: passwordNew})
	return {result: 'complete'}
 
 })
 