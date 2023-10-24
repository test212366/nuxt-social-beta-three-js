
<script lang="ts">
	import {usePageStore} from '~/stores/index'

 	export default {
		computed: {
			store() {
				return usePageStore()
			}
		},
		props: {
			userName: {
				type: String,
				required: true
			},
			time: {
				type: String,
				required: true
			},
			lastMessage: {
				type: String,
				required: true
			},
			idMessages: {
				type: Number,
				required: false
			}
		},
		methods: {
			openMessanger(e:any) {
				if(this.store.animationText) return
				if(this.userName === 'BOT_S') {
					this.store.setChatUserName(this.userName)
					//@ts-ignore
					// console.log(this.store.user)
					if(this.idMessages ) this.store.setBotId(this.idMessages)
					
					this.store.openBotChat()


					this.store.changeFalse()
					this.store.increment(this.userName)
					this.store.changeTrue()
					this.store.hideChatsLetters()
					
					// return 
				} else {
					//@ts-ignore
					if(this.store.user.userName === this.userName) return 
					this.store.setChatUserName(this.userName, this.idMessages)
					// if(this.idMessages) this.store.openBotChat()
					this.store.getChat()
					
					
					this.store.changeFalse()
					this.store.increment(this.userName)
					this.store.changeTrue()
					this.store.hideChatsLetters()
				}

				//TEST
				// this.store.createNewChat()


			 
			}
		}
	}

</script>

<template> 
	<li @click="openMessanger" class="chat__item">
				<div class="img__chat" v-if="userName">
					<p>{{userName[0].toUpperCase()}}</p>

				</div>
				<!-- <img width="60" height="60" src="../static/avatar.jpg" alt="chat__user-img"> -->
				<div class="chat__description">
					<p class="chat__description-time">{{time}}</p>
					<p>{{userName}}</p>
					<p class="chat__description-message">{{lastMessage}}</p>
				</div>
			
	</li>

</template>


<style scoped>
	.chat__description-message {
		font-size: 12px;
		margin-top: 5px;
		color: #bfbfbf;
		text-overflow: ellipsis; 
		white-space: nowrap;
		width: 370px;
		overflow: hidden;
	}
	.chat__description-time {
		position: absolute;
		right: 0;
		font-size: 11px;
		
		top: 15px;
	}
	.chat__description {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	.chat__item {
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
		width: 450px;
		
		animation-name: animateMessage;
		animation-duration: 1s;
	}

	@keyframes animateMessage {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		
		to {
			opacity: 1 !important;
			transform: translateY(0) !important;
		}
	}
	.chat__item img {
		border-radius: 50%;
		opacity: 0.8;

	}
	.img__chat {
		display: flex;
		border-radius: 50%;
		background-color: #46464646;
		color: #a8a8a8;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
	}
	@media screen and (max-width: 490px) {
		.chat__item {
			width: 370px;
		}
		.chat__description-message {
			width: 295px;
		}
	}
	@media screen and (max-width: 390px) {
		.chat__item {
			width: 340px;
		}
		.chat__description-message {
			width: 265px;
		}
	}
	@media screen and (max-width: 370px) {
		.chat__item {
			width: 280px;
		}
		.chat__description-message {
			width: 205px;
		}
	}

</style>