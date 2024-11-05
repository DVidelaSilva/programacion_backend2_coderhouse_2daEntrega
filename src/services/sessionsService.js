import UserRepository from "../repositories/usersRepository.js";
import {createHash, isValidPassword} from '../utils/hash.bcrypt.js'
import { generateToken } from "../middlewares/jwt.middlewares.js";

class SessionService {

    constructor() {
        this.userRepository = new UserRepository();

    }

    sessionRegisterUser = async (data) => {
            const {first_name, last_name, email, age, password} = data
            const userFound = await this.userRepository.findUserByEmailInDB({email})
            if (userFound){
                throw new Error(`El usuario email <${email}>, ya se encuentra registrado`)
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            }

            const user = await this.userRepository.createUserInDB(newUser); 
            return user
    }


    sessionLoginUser = async (data) => {
        //IN
        const {email, password} = data
        const userFound = await this.userRepository.findUserByEmailInDB({email})
        
        //OUT
        if(!userFound){
            throw new Error(`El usuario email <${email}>, no se encuentra registrado`)
        }
        if (!isValidPassword(password, userFound.password)) {
            throw new Error(`Las credenciales no coinciden`)
        }
        const token = generateToken({id: userFound._id, role: userFound.role})

        const cookieOptions = {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        }
        return{ token, cookieOptions }
    }


    sessionLogoutUser = async () => {
        return {
            cookieName: 'token',
            message: 'Has cerrado session correctamente.'
        }
    }


    sessionGithubLogin = async (user) => {

        const token = generateToken({id: user._id, role: user.role})

        const cookieOptions = {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        }
        return{ token, cookieOptions }

    }



}



export default SessionService
