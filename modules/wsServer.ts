import { WebSocketServer } from "ws"
import { defineNuxtModule } from "@nuxt/kit"
import { disconnect } from "process"




export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("listen", (server) => {

      const wss = new WebSocketServer({ server })
		console.log(123)
      // nuxt.hook("close", () => wss.close())
      wss.on("connection", (ws, req) => {
			console.log('connet')
			const params = new URLSearchParams(req.url?.split('?')[1])
			const userName: any = params.get('userName')
			// console.log(userName)
			// usersConnected[userName] = ws
	
			//@ts-ignore

        ws.on("message", (data) => {
				//@ts-ignore
				const mess = JSON.parse(data)	
			// console.log("received: %s", data)
				//@ts-ignore
				// const {type, payload} = mess


				switch (mess.type) {
					case 'CLIENT:SEND_MESSAGE':
						// console.log('getMessage, send Back to all users')
			

						wss.clients.forEach((client: any) => {
							client.send(JSON.stringify(mess))
						})
				 

						break
				
				
					default:
						break;
				}

			})
		
      //   ws.send("someting");
      })
    })
  },
})