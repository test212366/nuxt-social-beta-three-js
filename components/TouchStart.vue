<template> 

	<div>

	</div>
</template>


<script>
	export default {
	mounted() {
		if (process.client && navigator.userAgent.match(/iPhone/i)) {
			document.documentElement.addEventListener('touchstart', this.handleTouchStart, false);
		}
	},
	beforeDestroy() {
		if (process.client && navigator.userAgent.match(/iPhone/i)) {
			document.documentElement.removeEventListener('touchstart', this.handleTouchStart, false);
		}
	},
	methods: {
		handleTouchStart(event) {
			if (event.touches.length > 1) {
			event.preventDefault();
			}
		},
	},
	};
</script>