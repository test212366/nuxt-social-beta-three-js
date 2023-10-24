import db from '../db'
import UserModel from '../models/userModel'

import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/SendMail';


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
	await db()	

	const {email, password, userName} = await readBody(event)
	const candidate = await UserModel.findOne({email})
  //@ts-ignore
	// console.log(candidate.email)
	if (candidate) return { error: "email already used" }
   const usedName = await UserModel.findOne({ userName })
   if (usedName) return { error: 'user name already used' }
   const hashPassword = await bcrypt.hash(password, 3)
		
   const activationLink = uuidv4()
   const user = await UserModel.create({
		 chats: [
			{
				userName: 'BOT_S',
				time: getDate(),
				lastMessage: 'test'
			}
		 ],
      email, userName, password: hashPassword, activationLink
      })

	// await mailSend.sendActivationEmail(email, `${event.req.headers.host}/activate/${activationLink}`)
   const userDto = new UserDto(user),
 		tokens = tokenService.generateTokens({...userDto})
   await tokenService.saveToken(userDto.id, tokens.refreshToken)
	await sendEmail(email, activationLink, event)

   
	return {
		registration: {
				...tokens,
				user
			}
         
      }
 })
 