<script>

export default {
		beforeMount() {
			this.activate()
		
			
			// window.location = '/'
		},
		methods: {
			async activate  () {
				const id = this.$route.params.id
			
				const data = await useFetch('/api/activate', {
							headers: {
								'Content-Type': 'application/json',
							},
							method: 'POST',
							body: JSON.stringify({
								id
							})
						})

			
						window.location = '/'
			}
		}
	}


</script>

<template> 

</template>

<style>

</style>