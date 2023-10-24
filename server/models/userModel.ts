import {Schema, model} from 'mongoose'
 

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: false},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    userName: {type: String, required: true},
    chats: {type: Array },
    token: {type: String, default: ''}
})
export default model('User', UserSchema)
// export default mongoose.model('User', userSchema);