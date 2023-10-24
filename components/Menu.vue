<script lang="ts">
	import {usePageStore} from '~/stores/index'

	export default {
		data() {
			return {
				changeName: false,
				newName: '',
				changePassword: false,
				wrongNewName: false,
				passwordNew: '',
				passwordOld: '',
				wrongNewPassword: false,

			}
		},
	
		computed: {
			store() {
				return usePageStore()
			}, 
			 
		},
		methods: {
			closeMenu() {
				this.changeName = false
				this.changePassword = false
				this.store.setMenuOpen()
			},
			exitAccount() {
				if(process.client) {
					localStorage.clear()
					window.location.reload()
				}
			},
			openMenu() {
				this.store.setOpenSearch()
			},

			changename() {
				this.changeName = !this.changeName
			},
			changepassword() {
				this.changePassword = !this.changePassword
			},
			async changeNameButton() {
				try {
					const {data} = await useFetch('/api/changeName', {
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							//@ts-ignore
							userName: this.store.user.userName,
							newName: this.newName.trim()
						})
					})
					const datai = data.value
					//@ts-ignore
					if(datai.err) {
						this.newName = ''
						return this.wrongNewName = true
					}
					window.location.reload()

				} catch(e) {
					console.log(e)
				}
			},
			async changePasswordButton() {
				try {
					const {data} = await useFetch('/api/changePassword', {
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							//@ts-ignore
							userName: this.store.user.userName,
							passwordOld: this.passwordOld,
							passwordNew: this.passwordNew,
						})
					})
					const datai = data.value
					console.log(datai)
					//@ts-ignore
					if(datai.err) {
						this.passwordOld = ''
						this.passwordNew = ''

						return this.wrongNewPassword = true
					}
					window.location.reload()

				} catch(e) {
					console.log(e)
				}
			}
			 
	}
}

</script>


<template>

	<section id="menu" :class="{ 'active__menu' : store.menuOpen }">
		<svg @click="closeMenu" class="menu__close" height="20px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
		<div class="menu__your-account">
			<div class="img__chat" v-if="store.user">
					<p>{{store.user.userName[0].toUpperCase()}}</p>

				</div>
			<!-- <img width="65" height="65" src="../static/avatar.jpg" alt=""> -->
			<div>
				<p>Your Account</p>
				<p>{{store.user ? store.user.userName : ''}}</p>


			</div>
			
		</div>

		<div id="menu__controller" :class="{'menu__activeContn ' :changeName || changePassword}">

			<button @click="openMenu">
				Find User
			</button>
			<button>
				Set Music
			</button>
			<button @click="changename()">
				Change Name
			</button>
			<button @click="changepassword()">
				Change Password
			</button>

		</div>
		<div id="change__name" :class="{'menu__active-name' : changeName}">
			<input v-model="newName" :class="{'wrongN' : wrongNewName}" placeholder="new Name" type="text">
			<button @click="changeNameButton">Save</button>
		</div>
		<div id="change__name" :class="{'menu__active-name' : changePassword}">
			<input v-model="passwordOld" :class="{'wrongN' : wrongNewPassword}" type="text" placeholder="first password">
			<input v-model="passwordNew" :class="{'wrongN' : wrongNewPassword}" type="text" placeholder="new password">
			<button @click="changePasswordButton">Save</button>
		</div>


		<button @click="exitAccount" class="menu__exit-account">Exit Account</button>

	</section>
	

 
</template>


<style>	
	.wrongN {
		border-color: rgb(144, 0, 0) !important;
	}
	.menu__active-name {
		opacity: 1 !important;
		transform: translateX(0) !important;
	}
	.menu__activeContn {
		opacity: 0 !important;
		transform: translateX(120%);
	}
	#change__name {
		position: absolute;
		top: 225px;
		left: 25px;
		right: 25px;
		transform: translateX(120%);
		transition: .5s ease all;
		opacity: 0;
		display: flex;
		flex-direction: column;

	}
	#change__name input {
		transition: .5s ease all;
		padding: 0 30px; 
		outline: none;
		transition: .7s ease all;
		margin: 13px;
		height: 46px;
		border-radius: 30px;
		border: 1px solid #727272;
		color: #727272;
		background-color: transparent;
	}
	#change__name button {
		transition: .7s ease all;
		margin: 13px;
		height: 46px;
		border-radius: 30px;
		border: 1px solid #727272;
		color: #727272;
		background-color: transparent;
	}
	#change__name button:hover {
		color: #fff;
		border-color: #fff;
	}
	.img__chat {
		margin-right: 20px;

		display: flex;
		border-radius: 50%;
		background-color: #3e3e3e46;
		color: #a8a8a8;
		align-items: center;
		justify-content: center;
		width: 65px;
		height: 65px;
	}
	#menu__controller {
		transition: 1s ease all;
		margin-top: 100px;
		display: flex;
		flex-direction: column;
	}
	#menu__controller button {
		transition: 1s ease all;
		margin: 13px;
		height: 46px;
		border-radius: 30px;
		border: 1px solid #727272;
		color: #727272;
		background-color: transparent;
	}
	#menu__controller button:hover {
		color: #fff;
		border-color: #fff;
	}

	.active__menu {
		right: 0  !important;
		visibility: visible !important;
		opacity: 1 !important;
	}
	.menu__close {
		fill: #727272;
		transition: .3s ease all;
		position: absolute;
		right: 77px;
		top: 60px;

	}
	.menu__close:hover {
		fill: #fff;
	}
	.menu__exit-account {
		position: absolute;
		transition: .7s ease all;
		bottom: 20px;
		left: 50%;
		background-color: transparent;
		color: #727272;
		border: 1px solid #727272;
		font-size: 12px;
		/* border: none; */
		border-radius: 25px;
		padding: 15px 40px;
		transform: translateX(-50%);
	}
	.menu__exit-account:hover {
		color: #fff;
		border-color: #fff;
	}
 
	.menu__your-account p:first-child {
		font-size: 13px;
		color: #a3a3a3;
		margin-bottom: 8px;
	}
	.menu__your-account p {
		/* font-size: 15px; */
		font-weight: 500;

	}
	.menu__your-account {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.img__chat p {
		margin-bottom: 0 !important;
	}
	#menu {
		overflow: hidden;
		transition: .8s ease all;
		/* transform: translateX(100%); */
		visibility: hidden;
		padding: 30px;
		backdrop-filter: blur(2px);
		border-radius: 20px 0 0 20px;
		opacity: 0;
		bottom: 0;
		width: 700px;
		background-color: #00000047;
		position: fixed;
		right: -100%;
		top: 0;
		z-index: 11;
	}
	@media screen and (max-width: 1200px) {
		#menu {
			width: 550px ;
		}
	}
	@media screen and (max-width: 900px) {
		.menu__your-account p:first-child {
			margin-bottom: 2px;
		}
		#menu__controller button, #change__name button, #change__name input {
			height: 40px;
			font-size: 11px !important;
			margin-bottom:4px;
		}
		.menu__close {
			right: 40px;
		}
		#menu {
			width: 400px ;
		}
		.menu__exit-account {
		
			font-size: 10px;
			/* border: none; */
			border-radius: 25px;
			padding: 12px 36px;
			transform: translateX(-50%);
		}
	}
	@media screen and (max-width: 550px) {
		.menu__close {
			right: 40px;
		}
		#menu {
			width: 100% ;
			border-radius: none;
			padding: 0;
		}
		.img__chat {
			height: 50px;
			width: 50px;
			margin-right: 10px;
		}
		.menu__close {
			top: 40px;
			right: 23px;
		}
		
	}
	@media screen and (max-width: 390px) {
		.menu__your-account {
			justify-content: start;
			margin-left: 20px;
		}
		 
		 
	}
</style>