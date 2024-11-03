import UserRepository from "../repositories/usersRepository.js";
import {createHash, isValidPassword} from '../utils/hash.bcrypt.js'

class SessionService {

    constructor() {
        this.userRepository = new UserRepository();

    }

    sessionRegisterUser = async (data) => {
 
            const {first_name, last_name, email, age, password} = data

            const existUser = await this.userRepository.findUserByEmailInDB({email})
            if (existUser){
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


    SessionLoginUser = async (data) => {

        const {email, password} = data

        const userFound = await this.userRepository.findUserByEmailInDB({email})
        if(!userFound){
            throw new Error(`El usuario email <${email}>, no se encuentra registrado`)
        }
    
        if (!isValidPassword(password, userFound.password)) {
            throw new Error(`Las credenciales no coinciden`)
        }

    }


    // getSessionLogout = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionGithub = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentUser = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentUserPremium = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentAdmin = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

}



export default SessionService
