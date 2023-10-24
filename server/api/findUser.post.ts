import db from '../db'
import UserModel from '../models/userModel'

//@ts-ignore
 
import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
//@ts-ignore

// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/SendMail';

export default defineEventHandler(async (event) => {
	// //@ts-ignore
	// const {req} = event
	// //@ts-ignore
	// const currentURL = process.server ? req.headers.host + req.url : window.location.href;
   //  console.log('Current URL:', currentURL);
	await db()	

	const {userName} = await readBody(event)
	
	const user = await UserModel.findOne({userName})
	if(!user) return {error: 'user name incorrect'}



   return {
		user 
   }
 })
 