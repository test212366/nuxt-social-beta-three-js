<!-- //TODO: сделать vidible:hidden у неиспользуемых компонентов -->

<script>
	import {usePageStore} from '~/stores/index'

	
	export default {
		computed: {
			store() {
				return usePageStore()
			}
		}
	}
 
</script>

<template>
	<section id="loading" >
		<div  class="loading__content">
			<p>LOADING..</p>
		
			<input readonly value="0" max="100" id="loadingInput" type="range"/>
		
		</div>
	</section>


</template>

<style>
	.loading__hidden {
		opacity: 0;
		transform: translateX(-100%);	
		visibility: hidden;
	}
	input[type="range"] { 
		margin: auto;
		-webkit-appearance: none;
		position: relative;
		overflow: hidden;
		height: 5px;
		width: 200px;
		cursor: pointer;
		border-radius: 20px; /* iOS */
	}

	::-webkit-slider-runnable-track {
		background: #1a1a1a;
		
	}

	/*
	* 1. Set to 0 width and remove border for a slider without a thumb
	* 2. Shadow is negative the full width of the input and has a spread 
	*    of the width of the input.
	*/
	::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px; /* 1 */
		height: 40px;
		background: #fff;
		box-shadow: -200px 0 0 200px rgb(255, 255, 255); /* 2 */
		
	}

	::-moz-range-track {
		height: 40px;
		background: #ddd;
	}

	::-moz-range-thumb {
		background: #fff;
		height: 40px;
		width: 20px;
		border: 3px solid #999;
		border-radius: 0 !important;
		box-shadow: -200px 0 0 200px dodgerblue;
		box-sizing: border-box;
	}

	::-ms-fill-lower { 
		background: dodgerblue;
	}

	::-ms-thumb { 
		background: #fff;
		border: 2px solid #999;
		height: 40px;
		width: 20px;
		box-sizing: border-box;
	}

	::-ms-ticks-after { 
		display: none; 
	}

	::-ms-ticks-before { 
		display: none; 
	}

	::-ms-track { 
		background: #ddd;
		color: transparent;
		height: 40px;
		border: none;
	}

	::-ms-tooltip { 
		display: none;
	}

	#loading {
		transition: 1s ease all;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		font-size: 12.5px;
		top: 0;
		background-color: #000000;
		z-index: 100;
	}
	.loading__content {
		display: flex;
		align-items: center;
		flex-direction: column;

	}
	.loading__content p{
		margin-bottom: 20px;
		font-weight: 500;
	}



</style>