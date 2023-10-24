<script lang="ts">
	//@ts-ignore
	// import {Email} from '../static/smtp'
	import {usePageStore} from '~/stores/index'

	// const { $mail } = useNuxtApp()
	
	export default {
		data() {
			return {
				email: '',
				password: '',
				loginSucced: false
			}
		},
		computed: {
			store() {
				return usePageStore()
			}
		},
		methods: {
			async backRegister() {
				if(this.store.animationText) return
				if(this.email.length > 5 && this.email.length <= 25 && this.password.length <= 10 && this.password.length >= 5) {

					
					// this. = this.email.trim()

					try {
						this.store.setLoading()
						//@ts-ignore
						//400c3d43-da28-48ca-ac50-0ef917c0c39f
						console.log(this.$mail)
						// this.$mail.setOptions({
						// 	message: {
						// 		to: this.email
						// 	}
						// })
						 
						//@ts-ignore
						// this.$mail.send({
						// 	from: 'John Doe',
						// 	subject: 'Incredible',
						// 	text: 'This is an incredible test message',
						// })
						 

						const {data} = await useFetch('/api/login', {
							headers: {
								'Content-Type': 'application/json',
							},
							method: 'POST',
							body: JSON.stringify({
								email: this.email.trim(),
								password: this.password.trim(),
							})
						})
						//@ts-ignore
						const datai = data.value
						 //@ts-ignore

						if(datai.error) {
							//@ts-ignore
							if(datai.error == '1' ) {
								this.store.errorL('This Email', 'wrong')
							} else {
								this.store.errorL('this pass', 'wrong')
							}
							this.store.setLoading()
							return
						}

//@ts-ignore
						if(datai.login.accessToken) {
						 //@ts-ignore
						 //@ts-ignore

							localStorage.setItem('token', datai.login.accessToken)
						}
					 
						console.log(datai)
						this.store.setLoading()
					
					

						 //@ts-ignore

						if(datai.login.accessToken) {
							this.loginSucced = true
						 //@ts-ignore
							this.store.setUser(datai.login.user)
							this.setChats()
						} 

					} catch (error) {
						console.log(error)
					}
				 
					return
				}
				this.store.changeFalse()
				this.store.decrement('REGISTER')
				this.store.changeTrue()
				this.store.hideLettersLogin()
			},
			setChats() {
				if(this.store.animationText) return
				this.store.changeFalse()
				this.store.increment('CHATS')
				this.store.changeTrue()
				this.store.eraseRegLogLetters()
			}
		}
	}
</script>

<template>
	<section id="login" :class="{'login__active' : store.change && store.currentPage === 2}">

		 
		<div class="registration__inputs">
				<Loader/>
				<input v-model="email"  type="email" placeholder="Enter your email..">
				<input v-model="password"  type="password" placeholder="Enter your password..">
				<div class="registration__or">
					<hr>
					<p>OR</p>
					<hr>
				</div>
				
				<GoogleButton/>

			</div>

			<button @click="backRegister" id="regstration__button" :class="{ 'hide__reg-button' : store.loading || loginSucced }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="50" stroke-dasharray="0 22.43994752564138" stroke-linecap="round" stroke-width="2"></circle></svg>
				 <!-- REGISTER -->
				
				  <p v-if="!(email.length > 5 && email.length <= 25 && password.length <= 10 && password.length >= 5)">
					Back Register
				 </p>
				 <p v-else>
					Login

				 </p>
			</button>
	</section>
	

</template>


<style>
	.login__active {
		right: 50% !important;
		opacity: 1 !important;
		visibility: visible !important;
	}
	#login {
		visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		opacity: 0;
		right: 100%;
		transform: translateX(50%);
		top: 300px;
		transition: 2s ease all;
	}


</style>

