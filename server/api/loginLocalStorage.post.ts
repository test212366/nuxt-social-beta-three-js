import db from '../db'
import UserModel from '../models/userModel'
import mailSend from '../utils/SendMail'
import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import jwt from 'jsonwebtoken'


const generateJwt = (id:any, email:any) => {
	return jwt.sign({ id, email }, 'fdsjlk lsfdlkj lsdk',
		 { expiresIn: '48h' })
}

export default defineEventHandler(async (event) => {
	await db()	

	const token = await readBody(event)
	const decode = jwt.decode(token),
		userFind = await UserModel.findById(decode.id),
		tokenNew = generateJwt(userFind!._id, userFind!.userName)

	if (userFind) return { user: userFind, token: tokenNew }
	else return { error: 'Токен не действительный' }
   
 
 })
 