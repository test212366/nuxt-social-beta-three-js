//@ts-ignore
import jwt from 'jsonwebtoken'

import tokenModel from '../models/TokenModel'

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, '13123213ffsfdsdcc', {expiresIn: '30m'}),
            refreshToken = jwt.sign(payload, '13123213ffsfdsdcc', {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId:any, refreshToken: any) {
        try {
            const tokenData = await tokenModel.findOne({user: userId})
            if(tokenData) {
                tokenData.refreshToken = refreshToken
                return tokenData.save()}
            const token = await tokenModel.create({user: userId, refreshToken})
            return token
        } catch (e) {
            return null
        }

    }
}
// module.exports = new TokenService
export default new TokenService()
