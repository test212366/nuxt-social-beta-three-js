<script  lang="ts">
	import {usePageStore} from '~/stores/index'

	export default {
		computed: {
			store() {
				return usePageStore()
			}
		},
		methods: {
			backChats() {
				this.store.changeFalse()
				this.store.decrement('CHATS')
				this.store.changeTrue()
				this.store.backChat()
				// this.store.hideChatsLetters('NIKITA ZMAN')
			},
			openMenu() {
				this.store.setMenuOpen()
			}
		}
	}

</script>


<template> 
	<header>
		<section class="container">
			<div class="header__logo">
				<div @click="backChats" id="messenger__back" :class="{'show__arr' : store.currentPage === 4}">
					<svg height="30px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="messenger__back" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>
				</div>
			
				<svg :class="{'hidden__hed' : store.currentPage === 4}" version="1.1" width="30px" height="30px" fill="#fff" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 317.536 317.536" style="enable-background:new 0 0 317.536 317.536;" xml:space="preserve">
					<g>
						<path d="M103.616,221.205c37.822-7.288,112.142-24.705,143.441-53.651c-2.918-4.087-40.701-23.574-40.701-23.574s44.988,0,63.195,0
							C300.611,139.707,311.942,0,311.942,0S182.788,70.085,148.508,113.826c-34.274,43.754-67.88,111.396-67.88,111.396l0.019-0.006
							c-42.462,45.148-75.053,81.132-75.053,81.132l35.727-18.991L103.616,221.205z M296.556,23.407
							c-1.42,11.645-3.432,26.247-6.144,41.087c-10.077,55.271-20.669,65.226-22.635,66.64h-61.421c-5.932,0-11.099,4.055-12.487,9.814
							c-1.395,5.765,1.324,11.735,6.594,14.454c8.021,4.145,16.935,8.927,24.094,12.95c-28.13,17.34-73.054,29.473-105.612,36.575
							l162.85-172.914C287.141,28.863,292.134,25.952,296.556,23.407z M158.623,121.756c18.529-23.644,67.932-56.318,106.904-80.001
							c-29.525,27.044-69.127,64.178-106.756,102.232c-14.717,14.878-29.731,30.373-44.332,45.631
							C126.714,168.1,142.653,142.142,158.623,121.756z M179.241,270.737c39.287,4.357,77.739,13.361,114.97,25.63
							c-19.261-3.618-38.477-7.127-57.835-9.589c-19.3-2.731-38.664-4.827-57.976-6.048c-16.748-0.88-33.477-1.247-50.001,0.019
							c3.528,0.63,7.07,1.253,10.604,1.896c9.621,1.793,19.293,3.573,29.056,5.842c4.904,1.195,9.743,2.359,14.955,4.389
							c1.311,0.533,2.654,1.112,4.177,2.012c0.771,0.469,1.594,0.99,2.558,1.889c0.88,0.932,2.32,2.23,2.815,5.264
							c0.411,3.162-1.273,5.598-2.269,6.613c-1.099,1.138-1.999,1.671-2.815,2.172l-1.285,0.675l-1.003,0.456l-2.095,0.803
							c-10.829,3.419-20.617,3.766-30.65,4.415c-9.949,0.488-19.827,0.418-29.673,0.148c-39.384-1.048-78.401-5.206-117.174-10.977
							c19.608,0.27,39.146,1.003,58.696,1.015c19.531,0.296,39.056,0.366,58.491-0.032c9.711-0.257,19.396-0.675,28.972-1.375
							c7.417-0.643,15.135-1.42,21.909-3.078c-2.731-0.79-5.566-1.517-8.438-2.172c-9.312-2.069-18.901-3.74-28.522-5.437
							c-9.64-1.819-19.21-3.445-29.184-5.945c-2.629-0.765-4.839-1.17-8.451-3.027c-0.54-0.334-1.041-0.611-1.857-1.33
							c-0.636-0.688-2.237-1.864-2.487-5.264c-0.058-1.62,0.578-3.117,1.163-3.965c0.572-0.868,1.189-1.414,1.575-1.742
							c0.938-0.733,1.485-0.97,2.069-1.273c2.05-0.919,3.368-1.163,4.801-1.497c5.444-1.105,10.257-1.594,15.341-1.999
							C139.658,267.742,159.613,268.494,179.241,270.737z"/>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
					<g>
					</g>
				</svg>
				<p class="header__title-l">
					SAUZGE
				</p>
				<div class="header__welcome"> 
					<p :class="{'active' : store.startAnimationHeader   }"> {{store.change ? store.currentPageTitle : store.prevCurrentPage}} </p>
					
					<div class="line"></div>
				</div>
			</div>	

			<div id="header__music" :class="{ 'hide__music' : store.currentPage > 2 }">
				<button>
					
				</button>
			</div>
			<div @click="openMenu" id="header__menu" :class="{'active__menu': store.currentPage > 2 }">
				<span>M</span>
				<div></div>
			</div>

		</section>
	 	

	</header>

</template>


<style>
	.show__arr {
		opacity: 1 !important;
		transform: translateX(0) !important;
	}
	.hidden__hed {
		opacity: 0 !important;
	}
	#messenger__back {
		transition: .5s ease all;
		opacity: 0 ;
		
		transform: translateX(-200%) ;
		position: absolute;
		left: 20px;
		top: 73px;
		z-index: 10;
	}
	#messenger__back svg {
		transform: none !important;
		 
		transition: .3s ease all;
		fill: rgb(126, 126, 126);
	}
	#messenger__back:hover svg {
		fill: white;
	}
	.wrong-red {
		border-color: #7a1616 !important;
	 }
	 .activeFind {
		opacity: 1 !important;
		top: 12% !important;
	 }
	.hide__music {
		opacity: 0 !important;
		visibility: hidden;
		transform: translateX(100%);
	}
	.active__messanger {
		transform: translateX(-50%) !important;
		opacity: 1 !important;
		visibility: visible !important;
	}

	.active__chats {
		/* opacity: 1 !important; */
		visibility: visible !important;
		/* bottom: 0px !important; */
		transform: translateX(-50%) !important;

	}
	#header__menu.active__menu {
		right: 80px !important;
		opacity: 1 !important;
		visibility: visible !important;
	}
	#header__menu  {
		visibility: hidden;
		position: absolute;
		/* right: 80px; */
		transition: .5s ease all;
		opacity: 0;
		right: -100px;
		top: 76px;
		display: flex;
		
		justify-content: space-between;
		align-items: center;
		font-weight: 100;
	}
	#header__menu:hover div {
		width: 10px;
	}
	#header__menu div{
		margin-top: 2px;
		transition: .5s ease all;
		margin-left: 20px;
		height: 1px;
		width: 30px;
		background-color: #fff;
	}

	@keyframes showChats {
		from {
			opacity: 0;
			bottom: -100%;
		}
		to {
			opacity: 1;
			bottom: 0;
		}
	}
	.active__registration {
		bottom: 150px !important;
		top: uset !important;
		opacity: 1 !important;
		visibility: visible !important;
	}
	 
	.hide__enter {
		opacity: 0;
		visibility: hidden;
		right: 20px !important;
		overflow: hidden;
	}
	#header__music {
		transition: .5s ease all;
		position: relative;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		border: 1.5px solid #fff;
	}
	#header__music button {
	 
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		height: 30px;
		width: 30px;
		background-color: transparent;
		border: 1.5px solid #fff;
		border-radius: 50%;
		animation-name: test;
		animation-duration: 1.5s ;
		transition-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}
	@keyframes test {
		from {
 
			width: 30px;
			height: 30px;
		}
		50% {
			opacity: 1;
		}
		to {
			width: 50px;
			opacity: 0;
			height: 50px;
		}
	}
	@keyframes changeWelcome {
		from {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.container {
		max-width: 1760px;
		margin: 0 auto;
		width: 100%;
	}
	.header__logo {
		display: flex;
		align-items: center;

	}
	.header__logo svg {
		transition: .5s ease all;
		transform: scale(-1, 1);
	}
	.header__title-l {
		margin-left: 10px;
		font-size: 18px;
	
		
		letter-spacing: 1.2px;
		font-weight: 600;
	}
	.header__welcome {
		display: flex;
		align-items: center;
		text-align: center;
 
		margin-left: 60px;
		font-size: 10px;
		letter-spacing: 1.1px;
		margin-top: 1px;
	}
	.header__welcome p {
		overflow: hidden;
		text-overflow: ellipsis;
		width: 105px;
		color: #9e9e9e;
	}
	.header__welcome p.active {
		animation-name: changeWelcome;
		animation-duration: 2s;
 

	}
	.line {
		width: 2px;
		height: 12px;
		margin-left: 20px;
		background-color: #7a1616;
	}
	header {
		padding: 70px 30px 0 30px;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 10;
	}
	header .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	@media screen and (max-width: 950px) {
		#header__menu.active__menu {
			right: 32px !important;
			top: 50px !important;
		}
		#messenger__back {
			top: 48px;
		}
		#header__menu div {
			width: 26px;
			margin-left: 10px;
		}
		#header__menu {
			font-size: 13px;
		}
		.active__registration {
			bottom: 70px !important;
		}
		.header__title-l {
			font-size: 14px;
		}
		.header__welcome p {
			font-size: 8px;
		}
		.header__welcome {
			margin-left: 26px;
		}
		#header__music {
			width: 27px;
			height: 27px;
		}
		header {
			padding-top: 45px;
		}
		.header__logo svg {
			width: 25px;
			height: 25px;
		}
	}
	@media screen and (max-width: 500px) {
		#messenger__back {
			top: 45px;
			left: 10px;
		}
		.header__title-l {
			font-size: 12px;
		}
		header {
			padding: 40px 20px 0 20px;
		}
		#header__music {
			width: 25px;
			height: 25px;
		}
		.header__logo svg {
			width: 20px;
			height: 20px;
		}
		.header__welcome p {
			font-size: 7px;
		}
		.header__welcome p {
			width: 80px;
		}
		#header__menu.active__menu {
			top: 45px !important;
		}
	}
	@media screen and (max-height: 700px) {
		.active__registration {
			bottom: 20px !important;
		}
	}
	 
</style>