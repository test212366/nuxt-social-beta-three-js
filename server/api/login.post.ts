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

	const {email, password} = await readBody(event)
	const user = await UserModel.findOne({ email })
   if (!user) return { error: '1' }
   const comparePassword = bcrypt.compareSync(password, user.password)
   if (!comparePassword) return { error: '2' }
   const userDto = new UserDto(user),
   tokens = tokenService.generateTokens({...userDto})
   await tokenService.saveToken(userDto.id, tokens.refreshToken)
   if(!user.isActivated) {
  		const activationLink = uuidv4()
		user.activationLink = activationLink
      await user.save()

		await sendEmail(email, activationLink, event)
  }
   return {
		login: {
			...tokens,
			user
		}
      
   }
 })
 