import jwt from 'jsonwebtoken'
import envConfig from '../config/envConfig.js'


const generateToken = user => jwt.sign(user, envConfig.private_key_jwt, {expiresIn: '1d'})

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);
    if(!authHeader) {
        return res.status(401).send({status: 'error', error: 'Not Authenticated'})
    }
    const token = authHeader.split('')[1]
    jwt.verify(token, envConfig.private_key_jwt, (error, usuarioExtraidoDelToken) => {
        
        if (error) {
            return res.status(403).send({ status: 'error', error: 'Invalid token' });
        }
        req.user = usuarioExtraidoDelToken
        next()
    })

}
export {
    generateToken,
    authTokenMiddleware
}


