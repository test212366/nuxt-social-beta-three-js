<script  lang="ts">
 	import {usePageStore} from '~/stores/index'
 
	export default {
		computed: {
			store() {
				return usePageStore()
			}
		},
		methods: {
			nextPage() {
				console.log(this.store.user)
				this.store.checkUser()
				if(this.store.user) return
				this.store.increment('REGISTRATION')
				this.store.changeTrue()
				 
			}
		}
	}
</script>


<template> 
	<button :class="{'hide__enter' : store.currentPage >= 1} " id="button__start" @click="nextPage">
		<div class="button__wrap">
			<svg id="curcle-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="50" stroke-dasharray="0 22.43994752564138" stroke-linecap="round" stroke-width="2"></circle></svg>
			<p class="button__enter">ENTER</p>			 
		</div>
		 
	</button>
			
</template>


<style scoped>
	.button__enter {
		font-weight: 100;
		letter-spacing: 1.2px;
		font-size: 18px;
		color: #bfbfbf;
		position: absolute;
		left: 50%;
		top: 49%;
		transform: translate(-50%, -50%);
		transition: .3s ease all;
	}
 
	#button__start {
		transition: .7s ease all;
		position: absolute;
		right: 400px;
		bottom: 40%;
		background-color: transparent;
		border: none;
		width: 300px;
		height: 300px;
	}
	#button__start:hover #curcle-start {
		width: 80%;
		height: 80%;
		stroke: red;
	}
	#button__start:hover p {
		color: white;
	}
	.button__wrap {
		position: relative;
 
	}
	#curcle-start {
		transition: .3s ease all;
		stroke: white;
		width: 100%;
		height: 100%;
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


	@media screen and (max-width: 1750px) {
		#button__start {
			right: 150px;
			/* top: 340px; */
		}
	}
	@media screen and (max-width: 1450px) {
		#button__start {
			/* top: 300px; */
			bottom: 45%;
			width: 230px;
			height: 230px;
		}
	}
	@media screen and (max-width: 1200px) {
		#button__start {
			right: 100px;
			width: 200px;
			height: 200px;
		}
	}
	@media screen and (max-width: 1000px) {
		#button__start {
	 
			right: 50px;
			width: 180px;
			height: 180px;
		}
	}
	@media screen and (max-width: 950px) {
		#button__start {
			top: unset;
			bottom: 270px;
			width: 150px;
			height: 150px;
			right: unset;
			left: 50%;
			transform: translateX(-50%);
		}
		.button__enter {
			font-size: 11px;
		}
	}
	@media screen and (max-width: 950px) {
		#button__start {
			bottom: 30%;
			width: 140px;
			height: 140px;
		}
	}
	
</style>