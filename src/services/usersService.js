
import UserRepository from "../repositories/usersRepository.js";
import {createHash} from '../utils/hash.bcrypt.js'
import CartRepository from "../repositories/cartsRepository.js";

class UserService {

    constructor() {
        this.userRepository = new UserRepository()
        this.cartRepository = new CartRepository()
    }

    createUser = async (data) => {
        try {
            //IN
            const cart = await this.cartRepository.createCartInDB(data)  

            const userCartId = cart.id

            console.log(userCartId);

            const {first_name, last_name, email, age, password, role} = data

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role,
                userCartId: userCartId
            }

            const user = await this.userRepository.createUserInDB(newUser); 
            
            
            
            //OUT
            return user
        } catch (error) {
            console.log(error)
        }
    }

    
    findAllUsers = async () => {
        try {
            //IN
            const users = await this.userRepository.findAllUsersInDB();
            //OUT
            return users
        } catch (error) {
            console.log(error);
        }
    }


    findUserById = async (uid) => {
        try {
            //IN
            const user = await this.userRepository.findUserByIdInDB(uid)
            //OUT
            return user
        } catch (error) {
            console.log(error);
        }
    }


    updateUserById = async (uid, data) => {
        try{
            //IN
            const user = await this.userRepository.updateUserByIdInDB(uid, data)
            //OUT
            return user
        } catch (error) {
            console.log(error);
        }
    }


    deleteUserById = async (uid) => {
        try {
            //IN
            const user = await this.userRepository.deleteUserByIdInDB(uid)
            //OUT
            return user
        } catch (error) {
            console.log(error);
        }
    }

}


export default UserService
