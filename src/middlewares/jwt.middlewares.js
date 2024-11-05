import jwt from 'jsonwebtoken'
import envConfig from '../config/envConfig.js'


const generateToken = user => jwt.sign(user, envConfig.private_key_jwt, {expiresIn: '1d'})

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log("Authorization Header:", authHeader);
    console.log(authHeader);

    if(!authHeader)
        return res
            .status(401)
            .send({status: 'error', error: 'Not authenticated'})
    
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).send({ status: 'error', error: 'Token missing' });
        }
        jwt.verify(token, envConfig.private_key_jwt, (error, usuarioExtraidoDelToken) => {
            if (error) {
                return res.status(403).send({ status: 'error', error: 'Token invalid or expired' });
            }
            req.user = usuarioExtraidoDelToken
            next()
        })
    
    }

export {
    generateToken,
    authTokenMiddleware
}


