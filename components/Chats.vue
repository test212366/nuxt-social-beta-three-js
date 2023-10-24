<template> 
	<!-- @ts-ignore -->
	<section id="chats" :class="{ 'active__chats' :  store.user  && store.user.isActivated && store.change && store.currentPage === 3}">
		<div id="registr__inp" :class="{'registration__active' : store.openSearch}">
			<div class="registration__inputs">

			<input :class="{'wrong-red': userDoesntFind}" v-model="searchInput" type="text" placeholder="Find User..">
			<svg @click="closeSearch" class="search__close" height="20px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>

			<svg @click="searchUser" class="search" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="27px" height="27px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
			</div>

		</div>
		<div id="show__find-user" :class="{'activeFind' : store.findUser.userName && !store.openSearch}">
			<Chat :time="''"  :userName="store.findUser.userName" :lastMessage="'Send Message For User'"  />
		</div>
		
		<ul v-if="store.user" class="chats__amount">
			<Chat  v-for="item of store.user.chats" :idMessages="item?.idMessages" :time="item.time" :userName="item.userName" :lastMessage="item.lastMessage" />
			


		</ul>



	</section>
	

</template>


<script lang="ts">
	import {usePageStore} from '~/stores/index'

 
 	export default {
		data() {
			return {
				searchInput: '',
				userDoesntFind: false,
				
			}
			
		},
		computed: {
			store() {
				return usePageStore()
			}
		},
		methods: {
			async searchUser() {
				if(!this.searchInput) return
				this.userDoesntFind = false
				const {data} = await useFetch('/api/findUser', {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						//@ts-ignore
						userName: this.searchInput,
					
					})
				})
				this.searchInput = ''
				const datai = data.value
				
				//@ts-ignore
				if(datai.error) this.userDoesntFind = true
				//@ts-ignore
				this.store.setUserFind(datai.user)
				// this.userFind = datai.user
				this.store.closeOpenSe()
			
				
			},
			closeSearch() {
			 
				this.store.setOpenSearch()
			}
		}
	}
</script>


<style scoped>

	.search {
		position: absolute;
		right: 0;
		top: 11px;
		transition: .3s ease all;
		fill: #767575;
	}
	.search__close {
		position: absolute;
		right: -60px;
		top: 16px;
		transition: .3s ease all;
		fill: #767575;
	}
	.search__close:hover {
		fill: #fff;
	}
	.search:hover {
		fill: #fff;
	}
	#registr__inp {
		opacity: 0;
		position: relative;
		transform: translateY(-150%);
		transition: .5s ease all;
		/* display: none; */
	}
	#show__find-user {
		position: absolute;
		top: -30%;
		transition: .5s ease all;
		opacity: 0;
		/* margin-bottom: 30px; */
	}
	
	#registr__inp input {
		margin-bottom: 50px !important;
		transition: .3s ease all;
	}
	.registration__active {
		opacity: 1 !important;
		transform: translateY(10%) !important;
	}
	.chats__amount {
		overflow-y: auto;
		/* height: 65vh;  */

		height:  calc(100vh - 33% );

		padding-right: 10px;
		padding-bottom:50px;
	}
	.chats__amount::-webkit-scrollbar {
		width: 7px;
		background-color: #3737373a;
		border-radius: 10px;
	}
	.chats__amount::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #75757515;
	}
	#chats input {
		width: 100% !important;
		margin-bottom: 100px;
	}
	#chats {
		
		visibility: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		top: 0;
		/* z-index: -20; */
		/* opacity: 0; */
		transition: 1s ease all;
		position: fixed;
		left: 50%;
		/* transform: translateX(-50%); */
		transform: translateX(-400%);
		bottom: 0;
	}
	#chats li {
		list-style: none;
	}
 
	@media screen and (max-width: 600px) {
		#registr__inp input {
			width: 84% !important;
		}
		.search {
			right: 35px;

		}
		.search__close {
			right: -10px;
		}
	}
	@media screen and (max-width: 950px) {
		.search__close {
			top: 12px !important;
		}
		.search {
			top: 7px;
		}
	}
	
	@media screen and (max-width: 790px) {
		.chats__amount {
			height:  calc(100vh - 40% );
		}
		.chats__amount::-webkit-scrollbar {
			width: 3px;
			background-color: #3737373a;
			border-radius: 10px;
		}
		.chats__amount::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #75757515;
		}
	}
	@media screen and (max-width: 500px) {
		.search__close {
			right: 10px !important;
			top: -30px !important;
		}
	}
 
</style>