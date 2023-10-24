import {Schema, model} from 'mongoose'


const MessagesSchema = new Schema({
	idMessages: {type: String, required: true},
	messages: {type: Array, default: []}
})
export default model('Messages', MessagesSchema)