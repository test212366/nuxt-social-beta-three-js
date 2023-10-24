import db from '../db'
import UserModel from '../models/userModel'

import tokenService from '../utils/Token'
import UserDto from '../models/userDto'
// import bcrypt from 'bcryptjs'
//@ts-ignore
import bcrypt from 'bcrypt';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { OAuth2Client } from "google-auth-library"

function getOauth2Client() {
	const oAuth2Client = new OAuth2Client(
	  '1094366230693-o4p7m2jepb1neslgl7593k7dqea96s4s.apps.googleusercontent.com',
	  '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',
	  'https://sparkly-sunflower-4dac43.netlify.app'
	);
 
	return oAuth2Client;
 }

 
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
	
	try {
		await db()	

		const {code} = await readBody(event)


		const client = getOauth2Client()

		const result = await client.getToken(code)
		//@ts-ignore
		const {payload} = await client.verifyIdToken({
				//@ts-ignore
				idToken: result.tokens.id_token,
				audience: '1094366230693-o4p7m2jepb1neslgl7593k7dqea96s4s.apps.googleusercontent.com',
			});
		
	
		// client.setCredentials(result.tokens)

		const user = await UserModel.findOne({ email: payload.email })
        if (user) {
            const userDto = new UserDto(user),
                tokens = tokenService.generateTokens({...userDto})
            return { user, tokens }
        } else {
            const user = await UserModel.create({
					chats: [
						{
							userName: 'BOT_S',
							time: getDate(),
							lastMessage: 'test'
						}
					 ],
                email: payload.email, userName: payload.name, password: '', isActivated: true
            }),
                userDto = new UserDto(user),
                tokens = tokenService.generateTokens({...userDto})
            return { user, tokens }
        }

	} catch(e) {
		console.log(e)
	}
	 

 
 })
 