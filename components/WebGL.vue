
<script setup lang="ts">
	import {usePageStore} from '~/stores/index'
 
	const store = usePageStore()
 
	const AimWebGL: Ref<HTMLDivElement | null> = ref(null)

	onMounted(() => {
		store.createWebGL(AimWebGL.value)
	})
 
	
</script>

<template> 
	<div ref="AimWebGL">

	</div>
</template>