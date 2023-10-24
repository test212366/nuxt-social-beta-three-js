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

export default defineEventHandler(async (event) => {
	// //@ts-ignore
	// const {req} = event
	// //@ts-ignore
	// const currentURL = process.server ? req.headers.host + req.url : window.location.href;
   //  console.log('Current URL:', currentURL);
	await db()	

	const {id} = await readBody(event)
	//@ts-ignore
	// console.log(data)
	
   const user = await UserModel.findOne({activationLink: id})
	
        if(!user) return {error: 'Ссылка подтверждения не верная'}

        user.isActivated = true
        await user.save()
		  //@ts-ignore
		   
   return {
		activate: 'success'
	}
 })
//  export default function (req:any, res:any) {
// 	const { params, url } = req;
// 	console.log(params)
// 	if (params.id) {
// 	  // Обработка подтверждения почты по идентификатору (params.id)
// 	  // Здесь вы можете выполнить необходимые действия, связанные с подтверждением почты
// 	  console.log('Подтверждение почты для идентификатора:', params.id);
 
// 	  // Перенаправление пользователя на ваш сайт
// 	  return res.redirect('/');
// 	} else {
// 	  // Обработка запроса на /api/activate без идентификатора
// 	  console.log('Запрос на /api/activate без идентификатора');
 
// 	  // Отправка ошибки "Страница не найдена"
// 	  return res.status(404).json({ message: 'Page not found' });
// 	}
//  }