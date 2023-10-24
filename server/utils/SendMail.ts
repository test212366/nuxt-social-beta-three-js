//@ts-ignore
import { useMailer } from '#mailer'

const mailService = useMailer()
const gmailTransporter = mailService.gmailTransporter()


export const sendEmail = async (email: string, activationLink: string, event: any) => {
	try {
		await mailService.sendMail({
			client_id: "1094366230693-o4p7m2jepb1neslgl7593k7dqea96s4s.apps.googleusercontent.com",
			options: {
			  to: email,
			  subject: '123123',
			  text: '1321231',
			  html: `
			  <section>
				  <h1>Подтверждение аккаунта NZox.</h1>
				  <p style="width: 80%">Перейдите по ссылке чтобы подтвердить аккаунт и наслаждайтесь всеми возможностями приложения.</p>
				  <a href="${event.req.headers.host}/activate/${activationLink}">${event.req.headers.host}/activate/${activationLink}</a>
				  <small>С ув. Никита Змановский</small>
			  </section>
		  `
			},
			transporter: gmailTransporter
		 })
	} catch(e) {
		console.log(e)
	}
 
}
		 