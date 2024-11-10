import passport from 'passport'
import jwt from 'passport-jwt'
import GithubStrategy from 'passport-github2'
import envConfig from '../config/envConfig.js'
import {createHash} from '../utils/hash.bcrypt.js'
import UserRepository from '../repositories/usersRepository.js'



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const userService = new UserRepository()

const initializePassport = () => {

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies) {
            token = req.cookies['token']
        }
        return token
    }


    //? Estrategia JWT

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envConfig.private_key_jwt
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}


//? Estrategia GitHub

    passport.use("github", new GithubStrategy(
        {
            clientID: envConfig.github_client_id,
            clientSecret: envConfig.github_client_secret,
            callbackURL: envConfig.github_callback_url
        },
        async (accesToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                let user = await userService.findUserByEmailInDB({email: profile._json.email})

                if(!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: profile._json.name,
                        email: profile._json.email,
                        password: createHash('123456')
                    }
                    let result = await userService.createUserInDB(newUser)
                    return done(null, result)
                }
                done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))


export {
    initializePassport
}


