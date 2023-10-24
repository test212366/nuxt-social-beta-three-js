<script setup lang="ts">
	import {useTokenClient,useCodeClient,type AuthCodeFlowSuccessResponse,type AuthCodeFlowErrorResponse,} from "vue3-google-signin"
	import {usePageStore} from '~/stores/index'

	const store = usePageStore()

		const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
			store.setLoading()
			const {data} = await useFetch('/api/loginGoogle', {
							headers: {
								'Content-Type': 'application/json',
							},
							method: 'POST',
							body: JSON.stringify({
								code: response.code
							})
						})
			const datai:any = data.value
			console.log(datai)
			//@ts-ignore
			if(datai.tokens.accessToken) {
				localStorage.setItem('token', datai.tokens.accessToken)
				store.setUser(datai.user)
				store.changeFalse()
				store.loginGoogle()
				store.changeTrue()
				store.eraseRegLogLetters()
			}  
			
			store.setLoading()
			console.log(store.user)

		}

		const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
			console.log("Error: ", errorResponse);
		}

		const { isReady, login } = useCodeClient({
			onSuccess: handleOnSuccess,
			onError: handleOnError,
		})

</script>


<template> 
	<button :disabled="!isReady" @click="() => login()" id="googleButton" class="registration__google"><svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 30 30" width="20px" fill="#767575" height="20px">    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"/></svg>
					LogIn Width Google </button>


</template>


<style scoped>

.registration__google {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 6px;
		width: 80%;
		padding: 12px 0;
		font-size: 12px;
		border-radius: 24px;
		font-weight: 500;
		border: 1px solid #767575;
		background-color: transparent;
		color: #b4b4b4;
	}
	.registration__google svg {
		margin-right: 10px;
		transition: .3s ease all;
	}
	@media screen and (max-width: 950px) {
		.registration__google svg {
			height: 15px;
			width: 15px;
		}
		.registration__google {
			font-size: 10px;
			padding: 10px;
		}
	}

</style>