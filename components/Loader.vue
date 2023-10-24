<script lang="ts">
	import {usePageStore} from '~/stores/index'
	export default {
		computed: {
			store() {
				return usePageStore()
			}
		},
	}

</script>

<template> 
	<div :class="{ 'hide__reg-loading' : ! store.loading }">
		<div id="loader" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

	</div>

</template>


<style>


</style>