<script  lang="ts">
	import {usePageStore} from '~/stores/index'
	import { Field, Form, ErrorMessage } from 'vee-validate';
 
 

	export default {
	
		
	 
		data() {
			return {
				email: '',
				userName: '',
				password: '',
		
				registerSucced: false
			}
		},
		computed: {
			store() {
				return usePageStore()
			}
		},
		methods: {
			async loginPage() {
				if(this.store.animationText) return
				// if(this.)
	 
				if(this.email.length > 5 && this.email.length <= 25 && this.userName.length >= 3 && this.userName.length <= 9  && this.password.length <= 10 && this.password.length >= 5) {

					

					try {
						this.store.setLoading()
						// this.loading = true
						const {data} = await useFetch('/api/registration', {
							headers: {
								'Content-Type': 'application/json',
				 
							},
							method: 'POST',
							body: JSON.stringify({
								email: this.email.trim(),
								password: this.password.trim(),
								userName: this.userName.trim()
							})
						})
						// console.log(data)
						//@ts-ignore
						const datai = data.value
						// console.log(datai)
						//@ts-ignore
						if(datai.error) {
							this.store.setLoading()
							console.log(datai.error)
							//@ts-ignore
							
							 this.store.errorR(datai.error)
							 return
						}
							//@ts-ignore
						
						if(datai.registration.accessToken) {
						//@ts-ignore
						
						//@ts-ignore
						
							localStorage.setItem('token', datai.registration.accessToken)
						}
					 
						this.store.setLoading()
						//@ts-ignore

						if(datai.registration.accessToken) {
							this.registerSucced = true
							this.store.confirmAccount()
						//@ts-ignore

							this.store.setUser(datai.registration.user)

						}  
					
					
					} catch(e) { 
						 console.error(e)
					}
					 return
				}
				this.store.changeFalse()
				this.store.increment('LOGIN')
				this.store.changeTrue()
				this.store.hideLettersRegister()
				 
			}

		}
	}

	//:class=" {'disAgree' : email.length !== 0 && email.length < 5 || email.length !== 0 && email.length > 15 }"
</script>


<template> 
	<section id="registration" :class="{' active__registration' : store.change && store.currentPage === 1}">
			<div class="registration__inputs">
				 <Loader />
				 
				<input  v-model="email" type="email" placeholder="Enter your email.."> <!--class="agree"  class="disAgree" -->
				<input v-model="userName" type="text" placeholder="Enter your username..">
				<input v-model="password" type="password" placeholder="Enter your password..">
				<div class="registration__or">
					<hr>
					<p>OR</p>
					<hr>
				</div>
				
				<GoogleButton/>
				 
			</div>
			
			<button @click="loginPage" id="regstration__button" :class="{ 'hide__reg-button' : store.loading || registerSucced }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="50" stroke-dasharray="0 22.43994752564138" stroke-linecap="round" stroke-width="2"></circle></svg>
				 <!-- REGISTER -->
				 <p v-if="!(email.length > 5 && email.length <= 25 && userName.length >= 3 && userName.length <= 9  && password.length <= 10 && password.length >= 5)">
					Have Account?
				 </p>
				 <p v-else>
					Register

				 </p>
			</button>

	 


	</section>
	

</template>


<style >	
	.hide__reg-button {
		opacity: 0 !important;
		transform: translateY(100%); 
	}
	.hide__reg-loading #loader {
		opacity: 0;
		bottom: -100%;
	}
	#loader {
		transition: .3s ease all;
		position: absolute;
		bottom: 50px;
		left: 50%;
		transform: translateX(-70%);
	}
	 .lds-roller {
		display: inline-block;
		position: relative;
		width: 50px;
		height: 50px;
		}
		.lds-roller div {
		animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		transform-origin: 40px 40px;
		}
		.lds-roller div:after {
		content: " ";
		display: block;
		position: absolute;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #767575;
		margin: -4px 0 0 -4px;
		}
		.lds-roller div:nth-child(1) {
		animation-delay: -0.036s;
		}
		.lds-roller div:nth-child(1):after {
		top: 63px;
		left: 63px;
		}
		.lds-roller div:nth-child(2) {
		animation-delay: -0.072s;
		}
		.lds-roller div:nth-child(2):after {
		top: 68px;
		left: 56px;
		}
		.lds-roller div:nth-child(3) {
		animation-delay: -0.108s;
		}
		.lds-roller div:nth-child(3):after {
		top: 71px;
		left: 48px;
		}
		.lds-roller div:nth-child(4) {
		animation-delay: -0.144s;
		}
		.lds-roller div:nth-child(4):after {
		top: 72px;
		left: 40px;
		}
		.lds-roller div:nth-child(5) {
		animation-delay: -0.18s;
		}
		.lds-roller div:nth-child(5):after {
		top: 71px;
		left: 32px;
		}
		.lds-roller div:nth-child(6) {
		animation-delay: -0.216s;
		}
		.lds-roller div:nth-child(6):after {
		top: 68px;
		left: 24px;
		}
		.lds-roller div:nth-child(7) {
		animation-delay: -0.252s;
		}
		.lds-roller div:nth-child(7):after {
		top: 63px;
		left: 17px;
		}
		.lds-roller div:nth-child(8) {
		animation-delay: -0.288s;
		}
		.lds-roller div:nth-child(8):after {
		top: 56px;
		left: 12px;
		}
		@keyframes lds-roller {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
		}



 
	.registration__or {
		display: flex;
		width: 94%;
		justify-content: center;
		align-items: center;
		
		padding: 10px 0;
	}
	.registration__or p {
		padding: 0  10px;
		font-size: 11px;
		color: #767575;
	}
	.registration__or hr {
		/* transform: rotate(90deg); */
		width: 100%;
		height: 0px;
		border-color: #000000;
	}
	#regstration__button:hover svg {
		transform: rotate(180deg);
		stroke: #ff0000;
	}
	#regstration__button:hover {
		color: #fff;
	}
	#regstration__button svg {
		transition: .3s ease all;
		stroke: white;
		position: absolute;
		left: 0;
		top: 1px;
		bottom: 0;
		right: 0;
		animation-name: loopRotate;
		animation-duration: 8s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}
	@keyframes loopRotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
	#regstration__button {
		position: relative;
		margin-top: 40px;
		background-color: transparent;
		border: none;
		width: 120px;
		height: 120px;
		transition: .3s ease all;
		font-size: 11px;
		color: #b4b4b4;
		font-weight: 600;
	}
	.disAgree {
		border-color: rgb(115, 24, 24) !important;
 
	}
	.agree {
		border-color: rgb(24, 115, 24) !important;
		color: rgb(24, 115, 24) !important;
	}
	.registration__inputs input {
		
		color: #fff;
		font-size: 14px;
		padding: 15px 25px;
 
		width: 350px;
		outline: none;
		margin-bottom: 10px;
		border-radius: 24px;
		border: 1px solid #767575;
		background-color: transparent;
	}
	.registration__inputs input::placeholder {
		color: #d4d4d4;
		font-size: 13px;
 
	}
	.registration__inputs {
		display: flex;
		align-items: center;
		flex-direction: column;	
	}

	#registration {
		visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: 2.5s ease all;
		position: absolute;
		left: 50%;
		/* top: 1000px; */
		bottom: -400px;
		opacity: 0;
		transform: translateX(-50%);	 
	}
 
	@media screen and (max-width: 950px) {
	 
		.registration__inputs input {
			padding: 13px 20px;
			font-size: 12px;
		}
		.registration__inputs input::placeholder {
			font-size: 12px;
		}
		.registration__or p {
			font-size: 9px;
		}
	 
		#regstration__button {
			font-size: 9px;
		}
	}
	@media screen and (max-width: 550px) {
		.registration__inputs input {
			width: 270px;	

		}
	}
	@media screen and (max-width: 350px) {
		.registration__inputs input {
			width: 240px;	

		}
	}

</style>