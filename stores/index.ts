import { defineStore } from "pinia";
import { WebGLScene } from '../class/WebGL'
import gsap from 'gsap'
import { v4 as uuidv4 } from 'uuid';
let user:any = null

const checkUserLocal = async () => {
	if(process.client && localStorage.getItem('token')) {
		const {data} = await useFetch('/api/loginLocalStorage', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body:  localStorage.getItem('token')
		})
							//@ts-ignore
		const datai:any = data.value
	
		user = datai.user

		if(datai.accessToken) {
			localStorage.setItem('token', datai.accessToken)
			localStorage.setItem('activationLink', datai.user.activationLink)
	
		}  
	
		
		
	}
}
const getDate = () => {
	const date = new Date()
	let min:any = date.getMinutes()

	if(min < 10) min = `0${min}`
	// console.log(date.getMonth(), date.getDay())

	// const dayOfWeek = week[dayofWeek];

	return `${date.getHours()}:${min}`
	// return `${date.getHours()}:${date.getMinutes()}`
}

checkUserLocal()

export const usePageStore = defineStore('counter', {
	state: () => ({
		currentPage:  0,
		change: false,
		currentPageTitle: 'WELCOME',
		prevCurrentPage: 'WELCOME',
		webGL: null,
		startAnimationHeader: false,
		menuOpen: false,
		loading: false,
		animationText: false,
		user: null,
		ws: null,
		chat: [],
		chatId: null,
		openSearch: false,
		chatUserName: null,
		findUser: {
			userName: ''
		}
	
	}),
	actions: {
		setUserFind(user:any) {
			this.findUser = user
		},
		setChatUserName(chatUser: string, idMessages: any) {
			if(idMessages) {
				this.chatId = idMessages
			}
			//@ts-ignore
			this.chatUserName = chatUser
			 
		},
		errorL(err: string, err2: string) {
			//@ts-ignore
			gsap.to(this.webGL.materialText.uniforms.uProgress1, {
				duration: 2,
				value: 0,
			//@ts-ignore
			}).then(() => {
				//@ts-ignore
				this.webGL.addLoginText(err, err2)
			})
		},
		
		errorR(err: string) {

			//@ts-ignore
			gsap.to(this.webGL.materialText.uniforms.uProgress1, {
				duration: 2,
				value: 0,
			//@ts-ignore
			}).then(() => {
				//@ts-ignore
				this.webGL.errorRegister(err)
			})
		},
		setOpenSearch() {
			this.openSearch = !this.openSearch
			this.findUser =  {
				userName: ''
			}
			if(this.openSearch) {
				this.menuOpen = false
					//@ts-ignore
				gsap.to(this.webGL.materialText.uniforms.uProgress1, {
					duration: 2,
					value: 0,
				//@ts-ignore
				})
			} else {
				this.menuOpen = false
					//@ts-ignore
				gsap.to(this.webGL.materialText.uniforms.uProgress1, {
					duration: 4,
					value: 2,
				//@ts-ignore
				})
			}
		},
		closeOpenSe() {
			this.openSearch = false
		},
		checkUser() {
			if(user) {
				this.changeFalse()
				this.currentPage = 2
				this.user = user
				this.increment('CHATS')
				this.socketConnection()
				this.removeLettersWebGL() 
				this.changeTrue()
			 
			}
		},
		setBotId(id: any) {
			this.chatId = id
		},
		async getChat() {
			if(!this.chatId) return
			const {data} = await useFetch('/api/getChat', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					//@ts-ignore
					// userName: this.user.userName,
					id: this.chatId
				})
			})
 
			const messVal = data.value

			//@ts-ignore
			this.chatId = messVal.idMessages
			//@ts-ignore
			this.chat = messVal.messages
		},
		async openBotChat() {
		
			// when user first time enter to chat to bot
	
			const {data} = await useFetch('/api/openBotChat', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					//@ts-ignore
					userName: this.user.userName,
					id: this.chatId
				})
			})
 
			const messVal = data.value

			//@ts-ignore
			this.chatId = messVal.idMessages
			//@ts-ignore
			this.chat = messVal.messages

			// this.store.changeFalse()
			// 	this.store.increment('NIKITA ZMAN')
			// 	this.store.changeTrue()
			// 	this.store.hideChatsLetters()


			//CREATE LOGIC
		},
		socketConnection() {
			try {
				console.log('try connection')
				const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
				const query = new URLSearchParams()
				//@ts-ignore
				query.append('userName', this.user.userName)
				console.log(query)
				//@ts-ignore
				this.ws = new WebSocket(`${wsProtocol}//${window.location.host}?${query.toString()}`)
				//@ts-ignore
				
				this.ws.onopen = () => console.log("connected")
				//@ts-ignore
			
				//@ts-ignore
	
				this.ws.onmessage = async (e) => {
					const message = JSON.parse(e.data)
	
					//@ts-ignore
					if(message.from === this.user.userName && message.to === 'BOT_S') {
						console.log('send myself message to bot', message.payload)
						console.log(message)
						
						//@ts-ignore
						this.chat.push(message)
					} else {
						//@ts-ignore
	
						console.log( message.to === this.user.userName && message.from !== this.chatUserName)
	
						//@ts-ignore
						if(message.from === this.user.userName ) {
							//@ts-ignore
							this.chat.push(message)
	
						}
						//@ts-ignore
						if(message.to === this.user.userName && message.from === this.chatUserName) {
						//@ts-ignore
							
							this.chat.push(message)
							//@ts-ignore
						} 
						//@ts-ignore
						
						if( message.to === this.user.userName && message.from !== this.chatUserName) {
							console.log(123)
							setTimeout( async () => {
								const res = await useFetch('/api/findUser', {
									headers: {
										'Content-Type': 'application/json',
									},
									method: 'POST',
									body: JSON.stringify({
										//@ts-ignore
										userName: this.user.userName
									})
								})
								const dataf = res.data.value
								console.log(dataf)
								//@ts-ignore
								this.user.chats = dataf.user.chats
							}, 1000)
							//get Chats
							 
						}
	
						console.log('emit message from user or myself')
					}
					
				}
			} catch(e) {
				console.log(e)
			}
			 

		},
	 
		async sendSocketMessage(message: string) {
			// this.chatId
			const messageSend = {
				payload: message,
				// userAdditional: '',
				time: getDate(),
				//@ts-ignore
				from: this.user.userName,
				to: this.chatUserName,
				type: 'CLIENT:SEND_MESSAGE'
			}

		 
			// Сделать пото логику при отсылке другому клиенту сооющения
		//@ts-ignore
		this.ws.send(JSON.stringify(messageSend))
			//create new Chat
			
			if(!this.chatId) {
				const res = await useFetch('/api/createNewChat', {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						//@ts-ignore
						message: {payload: messageSend.payload, time: messageSend.time, from: messageSend.from, to: messageSend.to},
				
					})
				})
				const dataf = res.data.value
				//@ts-ignore
				this.chatId = dataf

				return
			}
			 






			const {data} = await useFetch('/api/updateMessages', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					//@ts-ignore
					message: {payload: messageSend.payload, time: messageSend.time, from: messageSend.from, to: messageSend.to},
					id: this.chatId
				})
			})

	 
			const datai = data.value
	
			//@ts-ignore
			this.user.chats = datai
 

		 
		},
		loginGoogle() {
			this.currentPage = 2
			this.increment('CHATS')

		},
		setUser(user:any) {
			this.user = user
		},
		setAnimationText() {
			this.animationText = !this.animationText
		},
		setLoading() {
			this.loading = !this.loading
		},
		setMenuOpen() {
			this.menuOpen = !this.menuOpen
		},
		confirmAccount() {
				//@ts-ignore
			gsap.to(this.webGL.materialText.uniforms.uProgress1, {
				duration: 2,
				value: 0,
			//@ts-ignore
			}).then(() => 	this.webGL.confirmAccount())
		 
			 
		},
		increment(namePage: string) {
			this.currentPage++
			
			this.changePage(namePage)
		},
		changePage(namePage: string) {
			this.prevCurrentPage = this.currentPageTitle
			this.currentPageTitle = namePage
			this.startAnimationHeader = true
			if(this.currentPage === 1) this.removeLettersWebGL() 
			setTimeout(() => {
				this.startAnimationHeader = false
				this.prevCurrentPage = ''
			} , 2000)

		},
	
		decrement(namePage: string) {
			this.currentPage--
			this.changePage(namePage)

		},
		changeTrue() {
			setTimeout(() => this.change = true, 1000)
		},
		changeFalse() {
			this.change = false
		},
		createWebGL(dom:any) {
			//@ts-ignore
			this.webGL = new WebGLScene({dom})
		},
		removeLettersWebGL() {
			if(this.user) {
			
				this.eraseRegLogLetters()
			} else {
				//@ts-ignore
							
				gsap.to(this.webGL.materialText.uniforms.uProgress1, {
					duration: 2,
					value: 0,
				}).then(() => this.addLettersRegister())
			}
			 
		},
		eraseRegLogLetters () {
			this.setAnimationText()
			//@ts-ignore
			gsap.to(this.webGL.materialText.uniforms.uProgress1, {
				duration: 2,
				value: 0,
			}).then(() => {
				//@ts-ignore

				if(this.user) this.webGL.removeFletters()
				//@ts-ignore
				this.webGL.eraseRegLogLetters(!this.user.isActivated, this.user.userName)

				setTimeout(() => {
					this.setAnimationText()
				}, 7000)
		 

			} )
 
		},
		addLettersRegister() {
			this.setAnimationText()
			//@ts-ignore

			this.webGL.addRegisterText()
			setTimeout(() => {
				this.setAnimationText()
			}, 3000)
			
		},
		hideLettersLogin() {
			//@ts-ignore
		
			this.webGL.hideLettersLogin()
			
	
		},
		showLettersRegister() {
		
			//@ts-ignore

			this.webGL.showLettersRegister()
	
		},
		hideLettersRegister() {
			//@ts-ignore
			this.setAnimationText()
	 
			//@ts-ignore

			this.webGL.hideLettersRegister()


			setTimeout(() => {
				this.setAnimationText()
			}, 5000)
			// this.setAnimationText()

		},
		hideChatsLetters() {
			//@ts-ignore
			gsap.to(this.webGL.materialText.uniforms.uProgress1, {
				duration: 2,
				value: 0,
			//@ts-ignore
			}).then(() =>  {
			//@ts-ignore

				this.webGL.hideChatsLetters()
		
			})
	 

		},
		backChat() {
			
				//@ts-ignore
				gsap.to(this.webGL.materialText.uniforms.uProgress1, {
					duration: 2,
					value: 0,
				//@ts-ignore
				}).then(() => {
					this.chatId = null
					this.chatUserName = null
					this.chat = []
					this.findUser =  {
						userName: ''
					}
					//@ts-ignore
					this.webGL.backChat()
				})
		}

	}
})