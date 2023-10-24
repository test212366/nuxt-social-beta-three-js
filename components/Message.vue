<script lang="ts">


	export default {
	
		props: {
			payload: {
				type: String,
				required: true
			},
			from: {
				type: String,
				required: true
			},
			to: {
				type: String,
				required: false
			},
			time: {
				type: String,
				require: false
			},
			isYou: {
				type: Boolean,
				require: true
			}

		},
	}

</script>


<template> 
		<div id="message" :class="{ 'message__isntyou' : !isYou}">
				<p id="massage__time" :class="{'message__time-isntyou' : !isYou}">{{time}}</p>
				<p class="message__target">{{payload}}</p>
				<p id="message__who" :class="{'message__who-isntyou' : !isYou}">{{isYou ? ':You' : 'To u:' }} </p>

			</div>
			

</template>


<style scoped>
	.message__who-isntyou {
		left: 0 !important;
		right: unset !important;
	}
	 .message__time-isntyou {
		left: 0 !important;
		right: unset !important;
	 }
	.message__isntyou {
		padding-left: 42px;
		width: unset !important;
		justify-content: start !important;
	}
	 #massage__time {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 13px;
		color: #9e9e9e;
	}
	#message__who {
		position: absolute;
		font-size: 13px;
		bottom: 0px;
		color: #9e9e9e;
		right: 0;
	}
	.message__target {
		text-align: end;
		margin-right: 42px;
		max-width: 600px;
		font-size: 13px;
		line-height: 18px;
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
	#message {
		min-height: 40px;
		margin-bottom: 40px;
		position: relative;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
 
		animation-name: animateMessage;
		animation-duration: 1s;
		
	}
 


	@media screen and (max-width: 880px) {
		.message__target {
			max-width: 500px;
		}
	}
	@media screen and (max-width: 770px) {
		.message__target {
			max-width: 400px;
			font-size: 11px;
		}
		#massage__time {
			font-size: 11px;
		}
		#message__who {
			font-size: 11px;
		}
	}
	@media screen and (max-width: 560px) {
		
		.message__target {
			max-width: 300px;
		}
	}
	@media screen and (max-width: 450px) {
		.message__target {
			max-width: 260px;
		}
	}
	@media screen and (max-width: 400px) {
		.message__target {
			max-width: 220px;
			margin-right: 34px;
		}
	}
 
</style>